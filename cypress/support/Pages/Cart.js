//Esta pagina maneja las ACCIONES en el CARRITO
import BasePage from './Base.js';

class CartPage extends BasePage {
    goToCart() {
        // Navega al carrito
        cy.xpath('//*[@id="navbarExample"]/ul/li[4]/a').click();
    }

    verifyProductInCart(productName) {
        // Verifica que el producto esté en el carrito
        cy.xpath(`//tr[td[contains(text(),"${productName}")]]/td[2]`)
            .should('have.text', productName);
    }

    verifyProductPriceInCart(productName, expectedPrice) {
        // Verifica el precio del producto en el carrito
        cy.xpath(`//tr[td[contains(text(),"${productName}")]]/td[3]`)
            .should('have.text', expectedPrice.toString());
    }

    verifyCartTotal(expectedTotal) {
        // Verifica que el total del carrito sea correcto
        cy.xpath('//h3[@id="totalp"]')
            .invoke('text')
            .then((totalText) => {
                const totalFromCart = parseInt(totalText.trim());
                expect(totalFromCart).to.eq(expectedTotal);
            });
    }

    removeProductFromCart(rowIndex) {
        // Elimina el producto especificado por el índice de la fila
        cy.xpath(`//tbody/tr[${rowIndex}]//a[contains(text(),"Delete")]`).click();
    }

    verifyNumberOfProductsInCart(expectedCount) {
        // Verifica que el número de productos en el carrito sea el esperado
        cy.xpath('//tbody/tr').should('have.length', expectedCount);
    }
}

export default CartPage;
