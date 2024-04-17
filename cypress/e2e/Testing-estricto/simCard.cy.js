const sleepCorto = 1000;
const sleepLargo = 2500;
describe("Sim card",function(){
    beforeEach(function(){
        cy.fixture("purchaseOrder").then(function (purchaseOrder) {
            this.purchaseOrder = purchaseOrder;
        });
        cy.fixture("simCard").then(function (simCard) {
            this.simCard = simCard;
        });
        cy.visit("/");
        cy.get("#email").type("admin@reportnow.com.mx");
        cy.get("#password").type("123456");
        cy.get("#continuar").click();
    })
    it("Crear orden de compra con 1 producto sim card",function(){
        //?CREAR ORDEN DE COMPRA
        //sección añadir provider
        //módulo administración
        cy.get(".p-element.ng-tns-c21-15").click();
        //ordenes
        cy.get(".p-element.ng-tns-c21-21").click();
        //de compra
        cy.get(".ng-tns-c21-25.ng-tns-c21-21 > .p-element").click();
        //boton agregar
        cy.get(".p-button-success").click();
        cy.wait(300)
        //nombre
        cy.get("#name").type(this.purchaseOrder.descripcionChipValida);
        //proveedor
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribir proveedor
        cy.get('.p-dropdown-filter')
        .type(this.purchaseOrder.proveedorChipValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //agregar productocy.get('[ng-reflect-label="Pieza"] > .p-ripple').click()
        cy.get(':nth-child(5) > .flex > p-button.p-element > .p-ripple').click();
        //producto
        cy.get(':nth-child(1) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribir producto
        cy.get('.p-dropdown-filter').type(this.purchaseOrder.productoChipValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //unidad
        cy.get(':nth-child(2) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //elegir "pieza"
        cy.get('[ng-reflect-label="Pieza"] > .p-ripple').click();
        //cantidad
        cy.get('#locale-us').type(this.purchaseOrder.cantidadValida);
        //precio
        cy.get(':nth-child(4) > .col-12 > .p-inputwrapper > .p-inputnumber > .p-inputtext').type(this.purchaseOrder.precioValida);
        cy.get(".p-button-primary").click();
    })
    it("Abastecer orden de compra",function(){
        //?ABASTECER ORDEN DE COMPRA
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
        cy.wait(400)
        cy.get("#reason").type("eb");
        //evidencia
        cy.get(".p-fileupload-buttonbar > .p-ripple").click();
        cy.get(".p-button-primary").click();
        //asignar persona
        cy.get(
            ".field > .p-inputwrapper > .p-dropdown > .p-dropdown-label"
        ).click();
        //elijo "administrador"
        cy.get(".p-element.ng-star-inserted > .p-ripple").click();
        //producto 1
        //serial
        cy.get('[ng-reflect-name="0"] > :nth-child(2) > .col-12 > #key').type(
            this.purchaseOrder.serialChipValida
        );
        //ubicacion
        cy.get(
            '[ng-reflect-name="0"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Cliente"] > .p-ripple').click();
        //estado
        cy.get(
            '[ng-reflect-name="0"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label'
        ).click();
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        //observacion
        cy.get(
            '[ng-reflect-name="0"] > :nth-child(5) > .col-12 > #reason'
        ).type("na");
        //boton abastecer
        cy.get("#p-tabpanel-0 > .mt-4 > .p-button-primary").click();
    });
    it("Crear sim card valida",function(){
        //módulo catálogos
        cy.get('.p-element.ng-tns-c21-32').click();
        //módulo sim cards
        cy.get('.ng-tns-c21-34.ng-tns-c21-32 > .p-element').click();
        //boton agregar
        cy.get('.p-button-success').click();
        cy.wait(400)
        //suministro
        cy.get(':nth-child(1) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribir serial
        cy.get('.p-dropdown-filter')
        .type(this.simCard.suministroValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //numero telefono
        cy.get('#simCardNumber').type(this.simCard.numeroTelefonoValida);
        //nombre compañía
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //elegir "telcel"
        cy.get('[ng-reflect-label="Telcel"] > .p-ripple').click();
        //plan servicio
        cy.get('#simCardServicePlan').type(this.simCard.planServicioValida);
        cy.intercept("POST", "http://localhost:1337/simCard/add").as(
            "añadirProducto"
        );
        cy.wait(sleepLargo);
        cy.get(".p-button-primary").click();
        cy.wait("@añadirProducto").its("response.statusCode").should("eq", 201);
        cy.url().should("eq", "http://localhost:4200/#/simCards");
        cy.wait(sleepLargo);
    })
})