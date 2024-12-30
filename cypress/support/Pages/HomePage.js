//Esta pagina se encargara de las acciones sobre el HomePage, es este caso la unica ACCION es click
//Otras acciones como click en add to cart ya no son propias del HomePage, lo hago asi teniendo en cuenta
//escalabilidad.

import BasePage from './Base.js';

class HomePage extends BasePage {
    clickOnProduct(productName) {
        // Busca y hace click en el producto
        cy.xpath(`//a[contains(text(),"${productName}")]`, { timeout: 10000 }).click();
    }
}

export default HomePage;
