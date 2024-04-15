const sleepCorto = 1000;
const sleepLargo = 2500;
describe("Producto",function(){
    beforeEach(function () {
        cy.fixture("product").then(function (producto) {
            this.producto = producto;
        });
        cy.visit("/");
        cy.get("#email").type("admin@reportnow.com.mx");
        cy.get("#password").type("123456");
        cy.get("#continuar").click();
    });
    it("Añadir Producto válido de tipo sim card", function () {
        //sección añadir producto
        cy.get(".p-element.ng-tns-c21-16").click();
        cy.get(
            ".ng-tns-c21-28.ng-tns-c21-16 > .p-element > .layout-menuitem-text"
        ).click();
        cy.get(".p-button-success").click();
        //formulario
        //marca
        cy.get("#brand").type(this.producto.marcaValido);
        cy.wait(sleepCorto);
        //modelo
        cy.get("#model").type(this.producto.modeloValido);
        //descripción
        cy.get("#description").type(this.producto.descripcionValido);
        //categoría
        cy.get(
            ":nth-child(4) > .p-inputwrapper > .p-dropdown > .p-dropdown-label"
        ).click();
        cy.get(".p-dropdown-filter")
            .wait(200)
            .type("{downarrow}")
            .wait(200)
            .type("{downarrow}")
            .wait(200)
            .type("{enter}");
        //precio
        cy.get("#price > .p-inputnumber > #locale-us").type(
            this.producto.precioValido
        );
        //garantia para el cliente
        cy.get(
            ":nth-child(2) > .p-inputwrapper > .p-inputnumber > #locale-us"
        ).type(this.producto.garantiaValido);
        cy.wait(sleepCorto);
        cy.get(
            ":nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label"
        ).click();
        cy.get("[ng-reflect-label='Día(s)'] > .p-ripple").click();
        cy.get(
            ":nth-child(4) > .p-element > .p-radiobutton > .p-radiobutton-box"
        ).click();
        cy.intercept("POST", "http://localhost:1337/product/add").as(
            "añadirProducto"
        );
        cy.get(".p-button-primary").click();
        cy.wait("@añadirProducto").its("response.statusCode").should("eq", 201);
        cy.url().should("eq", "http://localhost:4200/#/product");
    });
})
