//Esta pagina maneja las ACCIONES en el CARRITO

import BasePage from './Base.js';

class CartPage extends BasePage {
    verifyProductInCart(productName) {
        // Verifica que el producto esté en el carrito
        cy.xpath(`//td[contains(text(),"${productName}")]`).should('exist');
    }

    verifyProductPriceInCart(productName, expectedPrice) {
        // Verifica que el precio del producto sea correcto en el carrito
        cy.xpath(`//td[contains(text(),"${productName}")]/following-sibling::td[contains(text(),"${expectedPrice}")]`)
            .should('exist');
    }
}

export default CartPage;