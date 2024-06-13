const sleepCorto = 1000;
const sleepLargo = 2500;
describe("Rastreador",function(){
    beforeEach(function(){
        cy.fixture("tracker").then(function (tracker) {
            this.variable = tracker;
        });
        cy.visit("/");
        cy.get("#email").type("admin@reportnow.com.mx");
        cy.get("#password").type("123456");
        cy.get('[label="CONTINUAR"]').click();
    })
    it("Crear orden de compra valida sin cotización con 2 productos: sim card, qbit",function(){
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
        cy.get("#name").type(this.variable.descripcion);
        //proveedor
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribir proveedor
        cy.get('.p-dropdown-filter')
        .type(this.variable.proveedor)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //agregar producto
        cy.get(':nth-child(5) > .flex > p-button.p-element > .p-ripple').click();
        cy.wait(200)
        //producto 1
        cy.get(':nth-child(1) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribir producto
        cy.get('.p-dropdown-filter').type(this.variable.producto1)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //unidad
        cy.get(':nth-child(2) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //elegir "pieza"
        cy.get('[ng-reflect-label="Pieza"] > .p-ripple').click();
        //cantidad
        cy.get('#locale-us').type(this.variable.cantidad);
        //precio
        cy.get(':nth-child(4) > .col-12 > .p-inputwrapper > .p-inputnumber > .p-inputtext').type(this.variable.precio);
        //agregar producto
        cy.get(':nth-child(5) > .flex > p-button.p-element > .p-ripple').click();
        //producto 2
        cy.get(':nth-child(1) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').last().click();
        //escribir producto
        cy.get('.p-dropdown-filter').type(this.variable.producto2)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //unidad
        cy.get(':nth-child(2) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').last().click();
        //elegir "pieza"
        cy.get('[ng-reflect-label="Pieza"] > .p-ripple').last().click();
        //cantidad
        cy.get('[ng-reflect-name="1"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').type(this.variable.cantidad);
        //precio
        cy.get(':nth-child(4) > .col-12 > .p-inputwrapper > .p-inputnumber > .p-inputtext').last().type(this.variable.precio);
        //boton guardar
        cy.get(".p-button-primary").click();
        cy.wait(sleepLargo);
    })
    it("Abastecer compra válida con 2 productos",function(){
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
            this.variable.serialGPS
        );
        //ubicacion
        cy.get('[ng-reflect-name="0"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(200)
        cy.get('.p-dropdown-filter')
        .type("Oficina")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //estado
        cy.get('[ng-reflect-name="0"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //elegir "disponible"
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        //producto 2
        //serial
        cy.get('[ng-reflect-name="1"] > :nth-child(2) > .col-12 > #key').type(
            this.variable.iccidValida
        );
        //ubicacion
        cy.get('[ng-reflect-name="1"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(200)
        cy.get('.p-dropdown-filter')
        .type("Oficina")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //estado
        cy.get('[ng-reflect-name="1"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //elegir "disponible"
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        //boton abastecer
        cy.get("#p-tabpanel-0 > .mt-4 > .p-button-primary").click();
        cy.wait(sleepLargo);
    })
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
        .type(this.variable.iccidValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //numero telefono
        cy.get('#simCardNumber').type(this.variable.numeroValida);
        //nombre compañía
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //elegir "telcel"
        cy.get('[ng-reflect-label="Telcel"] > .p-ripple').click();
        //plan servicio
        cy.get('#simCardServicePlan').type(this.variable.planServicio);
        cy.get(".p-button-primary").click();
        cy.wait(sleepLargo);
    })
    it("Crear rastreador valida",function(){
        //módulo catálogos
        cy.get('.p-element.ng-tns-c21-33').click();
        //módulo rastreadores
        cy.get('.ng-tns-c21-36.ng-tns-c21-33 > .p-element').click();
        //boton agregar
        cy.get('.p-button-success').click();
        cy.wait(400)
        //suministro
        cy.get(':nth-child(1) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribir serial
        cy.get('.p-dropdown-filter')
        .type(this.variable.serialGPS)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //categoría
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.get('.p-dropdown-filter')
        .type(this.variable.categoriaValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //tarjeta sim
        cy.get(':nth-child(4) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribir sim
        cy.get('.p-dropdown-filter')
        .type(this.variable.iccidValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //voltaje maximo
        cy.get(':nth-child(5) > .p-inputwrapper > .p-inputnumber > #locale-us').type(this.variable.voltajeValida);
        //voltaje minimo
        cy.get(':nth-child(6) > .p-inputwrapper > .p-inputnumber > #locale-us').type(this.variable.voltajeValida);
        cy.intercept("POST", "http://localhost:1337/tracker/add").as(
            "añadirProducto"
        );
        cy.wait(sleepLargo);
        cy.get(".p-button-primary").click();
        cy.wait("@añadirProducto").its("response.statusCode").should("eq", 201);
        cy.url().should("eq", "http://localhost:4200/#/trackers");
        cy.wait(sleepLargo);
    })
    it("Crear rastreador invalida por exceso de caracteres",function(){
        //módulo catálogos
        cy.get('.p-element.ng-tns-c21-33').click();
        //módulo rastreadores
        cy.get('.ng-tns-c21-36.ng-tns-c21-33 > .p-element').click();
        //boton agregar
        cy.get('.p-button-success').click();
        //imei
        cy.get('#name').type(this.variable.imeiInvalida)
        cy.wait(sleepLargo);
        cy.get(".p-button-primary").click();
        cy.url().should("eq", "http://localhost:4200/#/trackers/add");
        cy.wait(sleepLargo);
    })
    it("Crear rastreador invalida por campos vacíos",function(){
        //módulo catálogos
        cy.get('.p-element.ng-tns-c21-33').click();
        //módulo rastreadores
        cy.get('.ng-tns-c21-36.ng-tns-c21-33 > .p-element').click();
        //boton agregar
        cy.get('.p-button-success').click();
        cy.wait(sleepLargo);
        cy.get(".p-button-primary").click();
        cy.url().should("eq", "http://localhost:4200/#/trackers/add");
        cy.wait(sleepLargo);
    })
})