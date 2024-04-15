const sleepCorto = 1000;
const sleepLargo = 2500;
describe.skip("Ordenes de compra", function () {
    beforeEach(function () {
        cy.fixture("purchaseOrder").then(function (purchaseOrder) {
            this.purchaseOrder = purchaseOrder;
        });
        cy.visit("/");
        cy.get("#email").type("admin@reportnow.com.mx");
        cy.get("#password").type("123456");
        cy.get("#continuar").click();
    });
    it("Añadir orden de compra con cotizacion", function () {
        //sección añadir provider
        //módulo administración
        cy.get(".p-element.ng-tns-c21-15").click();
        //ordenes
        cy.get(".p-element.ng-tns-c21-21").click();
        //de compra
        cy.get(".ng-tns-c21-25.ng-tns-c21-21 > .p-element").click();
        //boton agregar
        cy.get(".p-button-success").click();
        //nombre
        cy.get("#name").type(this.purchaseOrder.descripcionValida);
        //cotizacion
        cy.get(
            ":nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label"
        ).click();
        cy.get(".p-dropdown-filter").type(this.purchaseOrder.cotizacionValida);
        cy.get("#pr_id_8_list > :nth-child(1) > .p-ripple").click();
        cy.wait(sleepCorto);
        cy.intercept("POST", "http://localhost:1337/purchaseOrder/add").as(
            "agregar"
        );
        cy.get(".p-button-primary").click();
        cy.wait(sleepLargo);
        cy.wait("@agregar").its("response.statusCode").should("eq", 201);
        cy.url().should("eq", "http://localhost:4200/#/orders");
    });
    it("Abastecer orden de compra con 2 productos", function () {
        //sección añadir provider
        //módulo administración
        cy.get(".p-element.ng-tns-c21-15").click();
        //ordenes
        cy.get(".p-element.ng-tns-c21-21").click();
        //de compra
        cy.get(".ng-tns-c21-25.ng-tns-c21-21 > .p-element").click();
        //estado
        cy.get('[psortablecolumn="purchaseOrderStatus"]').click();
        //boton abastecer
        cy.get(":nth-child(1) > :nth-child(6) > .flex > .p-button-success")
            .first()
            .click();
        //observaciones
        cy.get("#reason").type("eb");
        //evidencia
        cy.get(".p-fileupload-buttonbar > .p-ripple").click();
        cy.get(".p-button-primary").click();
        //asignar persona
        cy.get(
            ".field > .p-inputwrapper > .p-dropdown > .p-dropdown-label"
        ).click();
        cy.get(".p-element.ng-star-inserted > .p-ripple").click();
        //producto 1
        //serial
        cy.get('[ng-reflect-name="0"] > :nth-child(2) > .col-12 > #key').type(
            this.purchaseOrder.serial1Valida
        );
        //ubicacion
        cy.get(
            '[ng-reflect-name="0"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Patria"] > .p-ripple').click();
        //estado
        cy.get(
            '[ng-reflect-name="0"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        //observacion
        cy.get(
            '[ng-reflect-name="0"] > :nth-child(5) > .col-12 > #reason'
        ).type("eb");
        //producto 2
        //serial
        cy.get('[ng-reflect-name="1"] > :nth-child(2) > .col-12 > #key').type(
            this.purchaseOrder.serial2Valida
        );
        //ubicacion
        cy.get(
            '[ng-reflect-name="1"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Patria"] > .p-ripple').click();
        //estado
        cy.get(
            '[ng-reflect-name="1"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        //observacion
        cy.get(
            '[ng-reflect-name="1"] > :nth-child(5) > .col-12 > #reason'
        ).type("eb");
        //boton abastecer
        cy.get("#p-tabpanel-0 > .mt-4 > .p-button-primary").click();
        cy.wait(sleepLargo);
        cy.url().should("eq", "http://localhost:4200/#/orders");
    });
    it("Añadir orden de compra con cotizacion de 1 producto con serial ya abastecido", function () {
        //sección añadir provider
        //módulo administración
        cy.get(".p-element.ng-tns-c21-15").click();
        //ordenes
        cy.get(".p-element.ng-tns-c21-21").click();
        //de compra
        cy.get(".ng-tns-c21-25.ng-tns-c21-21 > .p-element").click();
        //boton agregar
        cy.get(".p-button-success").click();
        //nombre
        cy.get("#name").type(this.purchaseOrder.descripcionValida);
        //cotizacion
        cy.get(
            ":nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label"
        ).click();
        cy.get(".p-dropdown-filter").type(this.purchaseOrder.cotizacionValida);
        cy.get("#pr_id_8_list > :nth-child(1) > .p-ripple").click();
        cy.wait(sleepCorto);
        cy.intercept("POST", "http://localhost:1337/purchaseOrder/add").as(
            "agregar"
        );
        cy.get(".p-button-primary").click();
        cy.wait(sleepLargo);
        cy.wait("@agregar").its("response.statusCode").should("eq", 400);
        cy.url().should("eq", "http://localhost:4200/#/orders");
    });
});
describe("Ordenes de compra",function(){
    beforeEach(function () {
        cy.fixture("purchaseOrder").then(function (purchaseOrder) {
            this.purchaseOrder = purchaseOrder;
        });
        cy.visit("/");
        cy.get("#email").type("admin@reportnow.com.mx");
        cy.get("#password").type("123456");
        cy.get("#continuar").click();
    });
    it("Abastecer orden de compra con 5 productos", function () {
        //sección añadir provider
        //módulo administración
        cy.get(".p-element.ng-tns-c21-15").click();
        //ordenes
        cy.get(".p-element.ng-tns-c21-21").click();
        //de compra
        cy.get(".ng-tns-c21-25.ng-tns-c21-21 > .p-element").click();
        cy.wait(500);
        //estado
        cy.get('[psortablecolumn="purchaseOrderStatus"]').click();
        //boton abastecer
        cy.get(":nth-child(1) > :nth-child(6) > .flex > .p-button-success")
        //cy.get(':nth-child(1) > :nth-child(6) > .flex > .p-button-help')
            .first()
            .click();
        //observaciones
        cy.get("#reason").type("eb");
        //evidencia
        cy.get(".p-fileupload-buttonbar > .p-ripple").click();
        cy.get(".p-button-primary").click();
        //asignar persona
        cy.get(
            ".field > .p-inputwrapper > .p-dropdown > .p-dropdown-label"
        ).click();
        cy.get(".p-element.ng-star-inserted > .p-ripple").click();
        //producto 1
        //serial
        cy.get('[ng-reflect-name="0"] > :nth-child(2) > .col-12 > #key').type(
            this.purchaseOrder.serial1Valida
        );
        //ubicacion
        cy.get(
            '[ng-reflect-name="0"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Patria"] > .p-ripple').click();
        //estado
        cy.get(
            '[ng-reflect-name="0"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        //observacion
        cy.get(
            '[ng-reflect-name="0"] > :nth-child(5) > .col-12 > #reason'
        ).type("eb");
        //producto 2
        //serial
        cy.get('[ng-reflect-name="1"] > :nth-child(2) > .col-12 > #key').type(
            this.purchaseOrder.serial2Valida
        );
        //ubicacion
        cy.get(
            '[ng-reflect-name="1"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Patria"] > .p-ripple').click();
        //estado
        cy.get(
            '[ng-reflect-name="1"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        //observacion
        cy.get(
            '[ng-reflect-name="1"] > :nth-child(5) > .col-12 > #reason'
        ).type("eb");
        cy.wait(500);
        //producto 3
        //serial
        cy.get('[ng-reflect-name="2"] > :nth-child(2) > .col-12 > #key').type(
            this.purchaseOrder.serial3Valida
        );
        //ubicacion
        cy.get(
            '[ng-reflect-name="2"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Patria"] > .p-ripple').click();
        //estado
        cy.get(
            '[ng-reflect-name="2"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        //observacion
        cy.get(
            '[ng-reflect-name="2"] > :nth-child(5) > .col-12 > #reason'
        ).type("eb");
        //producto 4
        //serial
        cy.get('[ng-reflect-name="3"] > :nth-child(2) > .col-12 > #key').type(
            this.purchaseOrder.serial4Valida
        );
        //ubicacion
        cy.get(
            '[ng-reflect-name="3"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Patria"] > .p-ripple').click();
        //estado
        cy.get(
            '[ng-reflect-name="3"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        //observacion
        cy.get(
            '[ng-reflect-name="3"] > :nth-child(5) > .col-12 > #reason'
        ).type("eb");
        //producto 5
        //serial
        cy.get('[ng-reflect-name="4"] > :nth-child(2) > .col-12 > #key').type(
            this.purchaseOrder.serial3Valida
        );
        //ubicacion
        cy.get(
            '[ng-reflect-name="4"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Patria"] > .p-ripple').click();
        //estado
        cy.get(
            '[ng-reflect-name="4"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        //observacion
        cy.get(
            '[ng-reflect-name="4"] > :nth-child(5) > .col-12 > #reason'
        ).type("eb");

        cy.wait(sleepLargo);
        //boton abastecer
        cy.get("#p-tabpanel-0 > .mt-4 > .p-button-primary").click();
        cy.url().should("eq", "http://localhost:4200/#/orders");
    });   
})