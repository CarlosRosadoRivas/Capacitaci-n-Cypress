//Este es el archivo principal o Spec , desde aquí se harán los e2e y se importan las clases desde los otros files

//Esta línea de código me deja ver los diferentes comandos que tiene Cypress
/// <reference types="Cypress" />

//Importo el uso de xpath para su uso en lugar de cy.get
require('cypress-xpath');

//Importo las clases desde los Pages del POM
import HomePage from '../support/Pages/HomePage.js';
import ProductPage from '../support/Pages/Products.js';
import CartPage from '../support/Pages/Cart.js';

describe('Demoblaze Product Search and Cart Tests', () => {
    let homePage = new HomePage();
    let productPage = new ProductPage();
    let cartPage = new CartPage();

    before(() => {
        //Navega a la página para iniciar las pruebas
        homePage.navigateTo('https://www.demoblaze.com');
    });

    it('should search, add, validate products in the cart, and handle removing one product', () => {
        cy.fixture('articulos.json').then(function (productos) {
            let initialTotal = 0; // Inicializa la variable para el total

            // 1.- Agrego productos al carrito
            productos.forEach(function (producto) {
                homePage.clickOnProduct(producto.nombre);
                productPage.verifyProductName(producto.nombre);
                productPage.verifyProductPrice(producto.precio);
                productPage.addToCart();

                initialTotal += producto.precio; // Sumo el precio al total
                cy.visit('https://www.demoblaze.com'); // Regreso a la página principal para continuar con la prueba
            });

            // 2.- Voy al carrito
            cartPage.goToCart();

            // 3.- Valido que los productos en el carrito sean los que se puse en el paso 1
            productos.forEach(function (producto) {
                cartPage.verifyProductInCart(producto.nombre);
                cartPage.verifyProductPriceInCart(producto.nombre, producto.precio);
            });

            // 4.- Valido el total en el carrito es decir con 4 productos
            cartPage.verifyCartTotal(initialTotal);

            // 5.- Elimino el tercer producto (en eso quedamos, que fuera el 3ro)
            let productToRemove = productos[2]; // Selecciono el tercer producto
            cartPage.removeProductFromCart(3); // Elimino la fila 3 del carrito haciendo uso de la clase

            // 5._-Espero hasta que el producto eliminado ya no esté porque si no me da error porque el DOM no carga y si no cypress me da error
            cy.get('tbody').find('tr').should('have.length', 3); // Validar que la fila 3 desapareció haciendo uso del tr, aquí sí use not.exist ya que a diferencia de los otros con have.text en esta ocasiones sí quiero comprbar que ya no esta la fila

            // 6.- Vuelvo a calcular el total
            let recalculatedTotal = 0;
            cy.get('tbody').find('tr').each(($row) => {
                let price = parseInt($row.find('td:nth-child(3)').text().trim());
                recalculatedTotal += price; // Sumar cada precio desde el DOM
            }).then(() => {
                // Validar que el total recalculado coincida con el valor en el DOM
                cy.xpath('//h3[@id="totalp"]')
                    .invoke('text')
                    .then((totalText) => {
                        let totalFromCart = parseInt(totalText.trim());
                        expect(totalFromCart).to.eq(recalculatedTotal); // Comparar valores
                    });
            });

            // 7.- Verifico que solo queden 3 productos
            cartPage.verifyNumberOfProductsInCart(3);
        });
    });
});
