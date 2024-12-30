//Esta pagina manjea las ACCIONES dentro de cada producto, por lo que  su flujo es HomePage.js => Products.js

import BasePage from './Base.js';

class ProductPage extends BasePage {
    addToCart() {
        // Encuentra y hace click en botón "Add to cart"
        cy.xpath("//a[contains(text(),'Add to cart')]", { timeout: 10000 }).click();
    }

    verifyProductName(expectedName) {
        // Verifica el nombre del producto
        cy.xpath("//h2[@class='name']").should('contain', expectedName);
    }

    verifyProductPrice(expectedPrice) {
        // Verifica el precio del producto
        cy.xpath("//h3[@class='price-container']").should('contain', expectedPrice);
    }
}

export default ProductPage;