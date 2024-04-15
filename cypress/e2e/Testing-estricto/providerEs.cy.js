const sleepCorto = 1000;
const sleepLargo = 2500;
describe("Proveedor",function(){
    beforeEach(function () {
        cy.fixture("provider").then(function (provider) {
            this.provider = provider;
        });
        cy.visit("/");
        cy.get("#email").type("admin@reportnow.com.mx");
        cy.get("#password").type("123456");
        cy.get("#continuar").click();
    });
    it("Añadir Proveedor válido con 1 producto", function () {
        //sección añadir provider
        //módulo administración
        cy.get(".p-element.ng-tns-c21-15").click();
        //módulo proveedores
        cy.get(".ng-tns-c21-17.ng-tns-c21-15 > .p-element").click();
        //boton agregar
        cy.get(".p-button-success").click();
        //formulario
        cy.get("#name").type(this.provider.nombreValido);
        cy.get("#nationality").type(this.provider.nacionalidadValido);
        //giro comercial
        cy.get(".p-dropdown-label").click();
        cy.get(".p-dropdown-filter").type(this.provider.giroComercialValido);
        cy.get(".p-element.ng-star-inserted > .p-ripple").click();
        //añadir producto
        cy.get(
            ":nth-child(4) > .flex > p-button.p-element > .p-ripple"
        ).click();
        //?selecciona producto
        cy.get(
            ":nth-child(1) > .p-inputwrapper > .p-dropdown > .p-dropdown-label"
        ).click();
        cy.get(".p-dropdown-filter")
            .type(this.provider.productoValido)
            .type("{downarrow}")
            .wait(500)
            .type("{enter}");
        //garantia
        cy.get("#locale-us").type(this.provider.garantiaValido);
        //temporalidad
        cy.get(
            ":nth-child(4) > .p-inputwrapper > .p-dropdown > .p-dropdown-label"
        ).click();
        cy.get('[ng-reflect-label="Día(s)"] > .p-ripple').click();
        //agregar contacto
        cy.get(
            ":nth-child(6) > .flex-wrap > p-button.p-element > .p-ripple"
        ).click();
        //nombre
        cy.get(":nth-child(1) > .col-12 > .p-inputtext").type(
            this.provider.nombreContactoValido
        );
        //telefono
        cy.get(":nth-child(2) > .col-12 > .p-inputtext").type(
            this.provider.telefonoContactoValido
        );
        //email
        cy.get(":nth-child(3) > .col-12 > .p-inputtext").type(
            this.provider.emailConctactoValido
        );
        //agregar direccion
        cy.get(
            ":nth-child(7) > .flex-wrap > p-button.p-element > .p-ripple"
        ).click();
        //descipcion
        cy.get(
            "#pr_id_12-table > .p-datatable-tbody > .p-element.ng-star-inserted > :nth-child(1) > .col-12 > .p-inputtext"
        ).type(this.provider.descripcionDireccionesValido);
        cy.wait(sleepLargo);
        //direccion
        cy.get("#providerLocationAddress")
            .type(this.provider.direccionDireccionesValido)
            .wait(2000)
            .type("{downarrow}")
            .wait(500)
            .type("{enter}");
        cy.intercept("POST", "http://localhost:1337/provider/add").as(
            "agregarProveedor"
        );
        //boton guardar
        cy.get(".p-button-primary").click();
        cy.wait("@agregarProveedor")
            .its("response.statusCode")
            .should("eq", 201);
        cy.url().should("eq", "http://localhost:4200/#/providers");
    });
})
