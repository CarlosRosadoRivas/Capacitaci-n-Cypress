//Metodos base para la automatización de la busqueda de productos en el HomePAge
//Class BasePage
class BasePage {
    navigateTo(url) {
        cy.visit(url);
    }

    getElement(selector) {
        return cy.get(selector);
    }
}

export default BasePage;
