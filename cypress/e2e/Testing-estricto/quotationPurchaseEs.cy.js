const sleepCorto = 1000;
const sleepLargo = 2500;
describe("Cotizaciones de compra Especiales",function(){
    beforeEach(function () {
        cy.fixture("quotationPurchase").then(function (quotationPurchase) {
            this.quotationPurchase = quotationPurchase;
        });
        cy.visit("/");
        cy.get("#email").type("admin@reportnow.com.mx");
        cy.get("#password").type("123456");
        cy.get("#continuar").click();
    });
    it("Añadir cotización válido con 1 producto", function () {
        //sección añadir provider
        //módulo administración
        cy.get(".p-element.ng-tns-c21-15").click();
        //módulo cotizaciones
        cy.get(".p-element.ng-tns-c21-20").click();
        //de compra
        cy.get(".ng-tns-c21-23.ng-tns-c21-20 > .p-element").click();
        //boton agregar
        cy.get(".p-button-success").click();
        cy.wait(500);
        //proveedor
        //primera opcion
        cy.get(".p-dropdown-label")
        .type(this.quotationPurchase.proveedorValido)
        .wait(200)
        .type("{downarrow}")
        .wait(100)
        //descripcion
        cy.get("#name").type(this.quotationPurchase.descripcionValido);
        //añadir producto
        cy.get(
            ":nth-child(3) > .flex-wrap > p-button.p-element > .p-ripple"
        ).click();
        //producto
        cy.get('[formcontrolname="quotationPurchaseProductProductId"]').click();
        cy.get(".p-dropdown-filter").type(
            this.quotationPurchase.productoValido
        );
        cy.get(".p-element.ng-star-inserted > .p-ripple").click();
        //unidad
        cy.get('[formControlName="quotationPurchaseProductUnit"]').click();
        cy.get('[ng-reflect-label="Pieza"] > .p-ripple').click();
        //cantidad
        cy.get('[formControlName="quotationPurchaseProductQuantity"]').type(
            this.quotationPurchase.cantidadValido
        );
        cy.wait(sleepLargo);
        cy.intercept("POST", "http://localhost:1337/quotationPurchase/add").as(
            "agregarCotizacionCompra"
        );
        cy.get(".p-button-primary").click();
        cy.wait("@agregarCotizacionCompra")
            .its("response.statusCode")
            .should("eq", 201);
        cy.url().should("eq", "http://localhost:4200/#/quotationPurchases");
        cy.wait(sleepLargo);
    });
    it("Aceptar cotizacion con 1 producto", function () {
        //sección añadir provider
        //módulo administración
        cy.get(".p-element.ng-tns-c21-15").click();
        //módulo cotizaciones
        cy.get(".p-element.ng-tns-c21-20").click();
        //de compra
        cy.get(".ng-tns-c21-23.ng-tns-c21-20 > .p-element").click();
        //estatus
        cy.get('[psortablecolumn="quotationPurchaseStatus"]').click();
        cy.wait(500);
        //aceptar cotizacion
        cy.get(":nth-child(1) > :nth-child(6) > .flex > .p-button-success")
            .first()
            .click();
        //tiempo de entrega
        cy.get(".p-calendar > .p-element").click();
        //dia 31 - última fila, primera columna
        cy.get(
            "tbody.ng-tns-c88-55 > :nth-child(1) > :nth-child(3) > .p-ripple"
        ).click();
        //precio producto 1
        cy.get('[formControlName="quotationPurchaseProductPrice"]').type(
            this.quotationPurchase.precioValido
        );
        cy.get(".p-button-primary").click();
        cy.url().should("eq", "http://localhost:4200/#/quotationPurchases");
        cy.wait(sleepLargo);
    });   
})