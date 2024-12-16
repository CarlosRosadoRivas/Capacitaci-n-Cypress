describe('HomePage spec', () => {
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/')
  })

  context("Artículos del HomePage", () => {
    it('Probando primer artículo', () => {
      // Importando datos desde JSON
      cy.fixture('articulos.json').then((articulos) => {
        const articulo = articulos[0]; // Selecciona el primer artículo

        // Busca el artículo por nombre y hace clic en él
        cy.xpath('//*[@id="tbodyid"]/div[1]').contains(articulo.nombre).click();

        // Verifica que la URL cambió correctamente
        cy.location("pathname").should("eq", "/prod.html");
        cy.location("search").should("eq", `?idp_=${articulo.id}`);

        // Verifica el precio del artículo
        const precioConFormato = `$${articulo.precio}`; // Formatea el precio para incluir el signo de dólar
        cy.xpath("//h3[@class='price-container']").should('be.visible').contains(precioConFormato);

        // Hace clic en el botón Add to cart
        cy.xpath("//a[@class='btn btn-success btn-lg']").contains('Add to cart').click();

        // Verifica que el producto haya sido añadido
        cy.on('window:alert', (alertText) => {
          expect(alertText).to.equal('Product added')
        })
      })
    })

    it('Probando segundo articulo', () => {
      cy.fixture('articulos.json').then((articulos) => {
        const articulo = articulos[1]; // Segundo artículo
        //Busca el artiulo 2 y hace click en él
        cy.xpath(`//*[@id="tbodyid"]/div`).contains(articulo.nombre).click();

        // Verifica que la URL cambió correctamente
        cy.location("pathname").should("eq", "/prod.html");
        cy.location("search").should("eq", `?idp_=${articulo.id}`);

        // Verifica el precio del artículo
        const precioConFormato = `$${articulo.precio}`; // Formatea el precio para incluir el signo de dólar
        cy.xpath("//h3[@class='price-container']").should('be.visible').contains(precioConFormato);

        //Hace click en el boton Add to cart
        cy.xpath("//a[@class='btn btn-success btn-lg']").contains('Add to cart').click()

        //Verifica que el producto haya sido añadido
        cy.on('window:alert', (alertText) => {
          expect(alertText).to.equal('Product added')
        });
      })
    })

    it('Probando tercer articulo', () => {
      cy.fixture('articulos.json').then((articulos) => {
        const articulo = articulos[2]; // Tercer artículo
        //Busca el artiulo 3 y hace click en él
        cy.xpath('//*[@id="tbodyid"]/div[3]').contains(articulo.nombre).click()

        // Verifica que la URL cambió correctamente
        cy.location("pathname").should("eq", "/prod.html");
        cy.location("search").should("eq", `?idp_=${articulo.id}`);

        // Verifica el precio del artículo
        const precioConFormato = `$${articulo.precio}`; // Formatea el precio para incluir el signo de dólar
        cy.xpath("//h3[@class='price-container']").should('be.visible').contains(precioConFormato);

        //Hace click en el boton Add to cart
        cy.xpath("//a[@class='btn btn-success btn-lg']").contains('Add to cart').click()

        //Verifica que el producto haya sido añadido
        cy.on('window:alert', (alertText) => {
          expect(alertText).to.equal('Product added')
        });
      })
    })

    it('Probando cuarto articulo', () => {
      cy.fixture('articulos.json').then((articulos) => {
        const articulo = articulos[3]; // Cuarto artículo
        //Busca el artiulo 4 y hace click en él
        cy.xpath('//*[@id="tbodyid"]/div[4]').contains('Samsung galaxy s7').click()
        
        // Verifica que la URL cambió correctamente
        cy.location("pathname").should("eq", "/prod.html");
        cy.location("search").should("eq", `?idp_=${articulo.id}`)

        // Verifica el precio del artículo
        const precioConFormato = `$${articulo.precio}`; // Formatea el precio para incluir el signo de dólar
        cy.xpath("//h3[@class='price-container']").should('be.visible').contains(precioConFormato);

        //Hace click en el boton Add to cart
        cy.xpath("//a[@class='btn btn-success btn-lg']").contains('Add to cart').click()

        //Verifica que el producto haya sido añadido
        cy.on('window:alert', (alertText) => {
          expect(alertText).to.equal('Product added')
        })
      })
    })
  })
})