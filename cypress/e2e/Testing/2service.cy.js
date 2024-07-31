const sleepCorto = 1000;
const sleepLargo = 3500;
describe("Servicio",function(){
    beforeEach(function(){
        cy.fixture("service").then(function (service) {
            this.service = service;
        });
        cy.visit("/");
        cy.get("#email").type("admin@reportnow.com.mx");
        cy.get("#password").type("123456");
        cy.get('[label="CONTINUAR"]').click();
    })
    it("Añadir Servicio válido",function(){
        //sección añadir producto
        //módulo inventario
        cy.get(".p-element.ng-tns-c21-16").click();
        //módulo servicio
        cy.get('.ng-tns-c21-30.ng-tns-c21-16 > .p-element').click();
        //boton agregar
        cy.get('.p-button-success').click();
        //formulario
        //descripcion
        cy.get('#name').type(this.service.descripcionValido);
        //tipo moneda
        cy.get(':nth-child(1) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar MXN
        cy.get('[ng-reflect-label="Peso mexicano (MXN)"] > .p-ripple')
        .click()
        //precio
        cy.get('#price > .p-inputnumber > #locale-us')
        .type(this.service.precioValido);
        //renovación
        cy.get('.grid.field > :nth-child(2) > .p-inputwrapper > .p-inputnumber > #locale-us')
        .type(this.service.renovacionValido);
        //selecciona uno
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click();
        cy.get('.p-dropdown-filter')
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        cy.intercept("POST","http://localhost:1337/service/add").as("añadirServicio");
        //boton guardar
        cy.wait(sleepLargo)
        cy.get('.p-button-primary').click();
        cy.wait("@añadirServicio").its("response.statusCode").should("eq",201);
        cy.url().should("eq","http://localhost:4200/#/services");
        //id de la tabla del listado de ubicaciones
        cy.get('.p-highlight > .p-element').click();
        //primer fila, columna nombre
        cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(3)')
        .contains(this.service.descripcionValido)
        .should("be.visible");
        cy.wait(sleepLargo)
    })
    it("Añadir Servicio inválido por campos vacíos",function(){
        //sección añadir producto
        //módulo inventario
        cy.get(".p-element.ng-tns-c21-16").click();
        //módulo servicio
        cy.get('.ng-tns-c21-30.ng-tns-c21-16 > .p-element').click();
        //boton agregar
        cy.get('.p-button-success').click();
        //boton guardar
        cy.get('.p-button-primary').click();
        cy.url().should("eq","http://localhost:4200/#/services/add")
        cy.wait(sleepLargo)
    })
    it("Añadir Servicio inválido por exceso de caracteres",function(){
        //sección añadir producto
        //módulo inventario
        cy.get(".p-element.ng-tns-c21-16").click();
        //módulo servicio
        cy.get('.ng-tns-c21-30.ng-tns-c21-16 > .p-element').click();
        //boton agregar
        cy.get('.p-button-success').click();
        //formulario
        cy.get('#name').type(this.service.descripcionInvalido);
        //precio
        cy.get('#price > .p-inputnumber > #locale-us')
        .type(this.service.precioInvalido);
        //selecciona uno
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click();
        cy.get('.p-dropdown-filter')
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //boton guardar
        cy.wait(sleepLargo)
        cy.get('.p-button-primary').click();
        cy.url().should("eq","http://localhost:4200/#/services/add");
        cy.wait(sleepLargo)
    })
})