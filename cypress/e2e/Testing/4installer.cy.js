const sleepCorto = 1000;
const sleepLargo = 3500;
describe("Instaladores",function(){
    beforeEach(function(){
        cy.fixture("installer").then(function (installer) {
            this.installer = installer;
        });
        cy.visit("/");
        cy.get("#email").type("admin@reportnow.com.mx");
        cy.get("#password").type("123456");
        cy.get('[label="CONTINUAR"]').click();
    })
    it("Añadir Instalador válido",function(){
       //módulo instalaciones
       cy.get('.p-element.ng-tns-c21-34').click();
       //módulo instaladores
       cy.get('.ng-tns-c21-42.ng-tns-c21-34 > .p-element').click();
       //boton agregar
       cy.get('.p-button-success').click();
       //nombre
       cy.get('#installerName').type(this.installer.nombreValido);
       //ciudad
       cy.get('#installerAddress').type(this.installer.ciudadValido).wait(500).type("{downarrow}").wait(500).type("{enter}");
       //telefono
       cy.get('.ng-untouched > .p-inputtext').type(this.installer.telefonoValido);
       cy.intercept("POST","http://localhost:1337/installer/add").as("añadir");
        //boton guardar
        cy.wait(sleepLargo)
        cy.get('.p-button-primary').click();
        cy.wait("@añadir").its("response.statusCode").should("eq",201);
        cy.url().should("eq","http://localhost:4200/#/installers");
        cy.wait(sleepLargo)
        //id de la tabla del listado de ubicaciones
        cy.get('.p-highlight > .p-element').click();
        //primer fila, columna nombre
        cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(3)')
        .contains("Gerardo Bravo")
        .should("be.visible");
    })
    it("Añadir Instalador inválido por exceso de caracteres",function(){
       //módulo instalaciones
       cy.get('.p-element.ng-tns-c21-34').click();
       //módulo instaladores
       cy.get('.ng-tns-c21-42.ng-tns-c21-34 > .p-element').click();
       //boton agregar
       cy.get('.p-button-success').click();
       //nombre
       cy.get('#installerName').type(this.installer.nombreInvalido);
       //ciudad
       cy.get('#installerAddress').type(this.installer.ciudadInvalido).wait(500).type("{downarrow}").wait(500).type("{enter}");
       //telefono
       cy.get('.ng-untouched > .p-inputtext').type(this.installer.telefonoValido);
        //boton guardar
        cy.wait(sleepLargo)
        cy.get('.p-button-primary').click();
        cy.url().should("eq","http://localhost:4200/#/installers/add");
    })
    it("Añadir Instalador inválido por campos vacíos",function(){
       //módulo instalaciones
       cy.get('.p-element.ng-tns-c21-34').click();
       //módulo instaladores
       cy.get('.ng-tns-c21-42.ng-tns-c21-34 > .p-element').click();
       //boton agregar
       cy.get('.p-button-success').click();
        //boton guardar
        cy.wait(sleepLargo)
        cy.get('.p-button-primary').click();
        cy.url().should("eq","http://localhost:4200/#/installers/add");
        cy.wait(sleepLargo)
    })
})