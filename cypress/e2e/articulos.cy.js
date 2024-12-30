//Este es el archivo principal o Spec , desde aquí se haran los e2e y se importan las clases desde los otros files


//Esta lìnea de còdigo me deja ver los diferentes comandos que tiene cypress
/// <reference types="Cypress" />

//Importo el uso de xpath para su uso en lugar de cy.get
require('cypress-xpath');

//Importo las clases desde los Pages del POM
import HomePage from '../support/Pages/HomePage.js';
import ProductPage from '../support/Pages/Products.js';
import CartPage from '../support/Pages/Cart.js';

describe('Demoblaze Product Search and Cart Tests', () => {
    //Instanceo las clases (Las llamo), no se si esto esta correcto , no uso const que era lo que estaba mal en la anterior entrega
    let homePage = new HomePage();
    let productPage = new ProductPage();
    let cartPage = new CartPage();

    before(() => {
        //Uso de clase, va a la pagina para iniciar la prueba, uso before y no beforeache como antes porque se junto todo en un solo it
        //Hago uso de la primera variable que instancie en la linea 17, navigateTo esta definido en Base.js que => cy.visit
        homePage.navigateTo('https://www.demoblaze.com');
    });

    it('should search and add products to the cart', () => {
        //A partir de aquí inicia la prueba, tomara del JSON los datos iterando uno por uno.
        cy.fixture('articulos.json').then(function (productos) {
            productos.forEach(function (producto) {
                // Busca el producto por su nombre
                homePage.clickOnProduct(producto.nombre);
                // Despues verifica el nombre y precio del producto
                productPage.verifyProductName(producto.nombre);
                productPage.verifyProductPrice(producto.precio);
                // Añade el producto al carrito
                productPage.addToCart();
                // Regresa a la página principal
                cy.visit('https://www.demoblaze.com');
            });

            // Verifica el contenido del carrito
            //Busco en el navbar el carrito y doy click
            cy.xpath('//*[@id="navbarExample"]/ul/li[4]/a').click();
            //Verifico para cada elemento que se encuentre en el carrito y luego el precio refeljado
            productos.forEach(function (producto) {
                cartPage.verifyProductInCart(producto.nombre);
                cartPage.verifyProductPriceInCart(producto.nombre, producto.precio);
            //Como genere las iteraciones haciendo una unica prueba ya no hay cy.back y aqui termina el script
            });
        });
    });
});
