const sleepCorto = 1000;
const sleepLargo = 3500;
describe("Sim card",function(){
    beforeEach(function(){
        cy.fixture("simCard").then(function (simCard) {
            this.simCard = simCard;
        });
        cy.visit("/");
        cy.get("#email").type("admin@reportnow.com.mx");
        cy.get("#password").type("123456");
        cy.get('[label="CONTINUAR"]').click();
    })
    it("Crear orden de compra con 1 producto sim card",function(){
        //?CREAR ORDEN DE COMPRA
        //sección añadir provider
        //módulo administración
        cy.get('.p-element.ng-tns-c21-15').click();
        //ordenes
        cy.get('.p-element.ng-tns-c21-21').click();
        //de compra
        cy.get('.ng-tns-c21-26.ng-tns-c21-21 > .p-element').click();
        //boton agregar
        cy.get(".p-button-success").click();
        cy.wait(300)
        //nombre
        cy.get("#name").type(this.simCard.descripcionChipValida);
        //proveedor
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribir proveedor
        cy.get('.p-dropdown-filter')
        .type(this.simCard.proveedorChipValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //agregar productocy.get('[ng-reflect-label="Pieza"] > .p-ripple').click()
        cy.get(':nth-child(5) > .flex > p-button.p-element > .p-ripple').click();
        cy.wait(200)
        //producto
        cy.get(':nth-child(1) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribir producto
        cy.get('.p-dropdown-filter').type(this.simCard.productoChipValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //unidad
        cy.get(':nth-child(2) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //elegir "pieza"
        cy.get('[ng-reflect-label="Pieza"] > .p-ripple').click();
        //cantidad
        cy.get('#locale-us').type(this.simCard.cantidadValida);
        //precio
        cy.get(':nth-child(4) > .col-12 > .p-inputwrapper > .p-inputnumber > .p-inputtext').type(this.simCard.precioValida);
        cy.get(".p-button-primary").click();
        cy.wait(sleepLargo)
    })
    it("Abastecer orden de compra",function(){
        //?CREAR ORDEN DE COMPRA
        //sección añadir provider
        //módulo administración
        cy.get('.p-element.ng-tns-c21-15').click();
        //ordenes
        cy.get('.p-element.ng-tns-c21-21').click();
        //de compra
        cy.get('.ng-tns-c21-26.ng-tns-c21-21 > .p-element').click();
        //id
        cy.get(':nth-child(1) > .p-highlight').click();
        //boton abastecer
        cy.get(":nth-child(1) > :nth-child(6) > .flex > .p-button-success")
            .first()
            .click();
        //observaciones
        cy.wait(400)
        cy.get("#reason").type("eb");
        cy.get(".p-button-primary").click();
        //switch abastecer por lote
        cy.get('.p-inputswitch-slider').click();
        //asignar persona
        cy.get(
            ".field > .p-inputwrapper > .p-dropdown > .p-dropdown-label"
        ).click();
        //elijo "administrador"
        cy.get(".p-element.ng-star-inserted > .p-ripple").click();
        //producto 1
        //serial
        cy.get('[ng-reflect-name="0"] > :nth-child(2) > .col-12 > #key').type(
            this.simCard.iccidValida
        );
        //ubicacion
        cy.get(':nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-trigger').click();
        cy.wait(200)
        cy.get('.p-dropdown-filter')
        .type("Oficina")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //estado
        cy.get(':nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-trigger').click();
        //elegir "disponible"
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        //observacion
        cy.get(
            '[ng-reflect-name="0"] > :nth-child(5) > .col-12 > #reason'
        ).type("na");
        //boton abastecer
        cy.get("#p-tabpanel-0 > .mt-4 > .p-button-primary").click();
        cy.wait(sleepLargo);
    });
    it("Crear sim card valida",function(){
        //módulo catálogos
        cy.get('.p-element.ng-tns-c21-33').click();
        //módulo sim cards
        cy.get('.ng-tns-c21-35.ng-tns-c21-33 > .p-element').click();
        //boton agregar
        cy.get('.p-button-success').click();
        cy.wait(400)
        //suministro
        cy.get(':nth-child(1) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribir serial
        cy.get('.p-dropdown-filter')
        .type(this.simCard.iccidValida)
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
    it("Crear sim card invalida por exceso de caracteres",function(){
        //módulo catálogos
        cy.get('.p-element.ng-tns-c21-33').click();
        //módulo sim cards
        cy.get('.ng-tns-c21-35.ng-tns-c21-33 > .p-element').click();
        //boton agregar
        cy.get('.p-button-success').click();
        cy.wait(400)
        //suministro
        cy.get(':nth-child(1) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribir serial
        cy.get('.p-dropdown-filter')
        .type(this.simCard.suministroInvalida);
        cy.get('.p-dropdown-empty-message').click();
        //numero telefono
        cy.get('#simCardNumber').type(this.simCard.numeroTelefonoInvalida);
        //nombre compañía
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //elegir "telcel"
        cy.get('[ng-reflect-label="Telcel"] > .p-ripple').click();
        //plan servicio
        cy.get('#simCardServicePlan').type(this.simCard.planServicioInvalida);
        cy.wait(sleepLargo);
        cy.get(".p-button-primary").click();
        cy.url().should("eq", "http://localhost:4200/#/simCards/add");
        cy.wait(sleepLargo);
    })
    it("Crear sim card invalida por campos vacíos",function(){
        //módulo catálogos
        cy.get('.p-element.ng-tns-c21-33').click();
        //módulo sim cards
        cy.get('.ng-tns-c21-35.ng-tns-c21-33 > .p-element').click();
        //boton agregar
        cy.get('.p-button-success').click();
        cy.wait(400)
        cy.get(".p-button-primary").click();
        cy.url().should("eq", "http://localhost:4200/#/simCards/add");
        cy.wait(sleepLargo);
    })
})