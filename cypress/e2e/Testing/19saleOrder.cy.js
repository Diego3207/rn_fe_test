const sleepCorto = 1000;
const sleepLargo = 2500;
describe("Orden de venta",function(){
    beforeEach(function(){
        cy.fixture("orderSale").then(function (variable) {
            this.variable = variable;
        });
        cy.visit("/");
        cy.get("#email").type("admin@reportnow.com.mx");
        cy.get("#password").type("123456");
        cy.get('[label="CONTINUAR"]').click();
    })
    it("Crear cotizacion de venta válida",function(){
        //módulo administración
        cy.get('.p-element.ng-tns-c21-15').click();
        //módulo cotizaciones
        cy.get('.p-element.ng-tns-c21-20').click();
        //venta
        cy.get('.ng-tns-c21-23.ng-tns-c21-20 > .p-element').click();
        //boton agregar
        cy.get('.p-button-success').click();
        //descripcion
        cy.get('#name').type(this.variable.descripcionValida);
        //cliente
        cy.get(':nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribri "mattel"
        cy.get('.p-dropdown-filter')
        .type(this.variable.clienteValida)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //garantia
        cy.get('.p-inputswitch-slider').click();
        //tipo condiciones comerciales
        cy.get(':nth-child(5) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribir "equipo"
        cy.get('.p-dropdown-filter')
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //tipo moneda
        cy.get('#pr_id_13_label').click();
        cy.get('.p-dropdown-filter').last()
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //agregar producto
        cy.get(':nth-child(8) > .flex > p-button.p-element > .p-ripple').click();
        //producto
        cy.get('.col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribrir "qbit"
        cy.get('.p-dropdown-filter')
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //cantidad
        cy.get(':nth-child(3) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').type(this.variable.cantidadValida);
        //descuento
        cy.get(':nth-child(4) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').type(this.variable.descuentoValida);
        //porcentaje
        cy.get('.p-checkbox-box').first().click();
        //agregar servicio
        cy.get(':nth-child(9) > .flex > p-button.p-element > .p-ripple').click();
        //servicio
        cy.get(':nth-child(1) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').last().click();
        //escribir "Instalacion"
        cy.get('.p-dropdown-filter')
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //cantidad
        cy.get(':nth-child(3) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').last().type(this.variable.cantidadValida);
        //descuento
        cy.get(':nth-child(4) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').last().type(this.variable.descuentoValida);
        //agregar paquete
        cy.get(':nth-child(10) > .flex > p-button.p-element > .p-ripple').click();
        //paquete
        cy.get('.col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').last().click();
        //escribir "PAQUETE"
        cy.get('.p-dropdown-filter')
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //cantidad
        cy.get(':nth-child(3) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').last().type(this.variable.cantidadValida);
        //descuento
        cy.get(':nth-child(4) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').last().type(this.variable.descuentoValida);
        //descuento general
        //cy.get('.mt-5 > .p-inputwrapper > .p-inputnumber > #locale-us').type(this.variable.descuentoGeneralValida);
        cy.intercept("POST","http://localhost:1337/quotationSale/add").as("añadir");
        cy.wait(sleepLargo)
        //boton guardar
        cy.get('.p-button-primary').click();
        cy.wait("@añadir").its("response.statusCode").should("eq",201);
        cy.url().should("eq","http://localhost:4200/#/quotationSales");
        cy.wait(sleepLargo)
    })
    it("Aceptar cotizacion valida",function(){
        //módulo administración
        cy.get('.p-element.ng-tns-c21-15').click();
        //módulo cotizaciones
        cy.get('.p-element.ng-tns-c21-20').click();
        //venta
        cy.get('.ng-tns-c21-23.ng-tns-c21-20 > .p-element').click();
        //ocultar barra de navegacion
        cy.get('.menu-button > .pi').click();
        //estado
        cy.get('[psortablecolumn="quotationSaleStatus"]').click();
        //aceptar cotización
        cy.get(':nth-child(1) > :nth-child(8) > .flex > .p-button-success > .p-button-icon').click();
        //aceptar
        cy.get('.p-confirm-dialog-accept').click();
        cy.url().should("eq","http://localhost:4200/#/quotationSales");
        cy.wait(sleepLargo)
    })
    it("Reanudar orden de valida",function(){
        //?CREAR ORDEN DE COMPRA
        //sección añadir provider
        //módulo administración
        cy.get('.p-element.ng-tns-c21-15').click();
        //ordenes
        cy.get('.p-element.ng-tns-c21-21').click();
        //venta
        cy.get('.ng-tns-c21-21.ng-tns-c21-15 > .ng-trigger > .active-menuitem > .p-element').click()
        //estatus
        cy.get('[psortablecolumn="saleOrderStatus"]').click();
        //reanudar venta
        cy.get(':nth-child(1) > :nth-child(9) > .flex > .p-button-help > .p-button-icon').click();
        cy.wait(700)
        //boton asignar
        cy.get(':nth-child(2) > .col-3 > .p-element').click();
        //seleccionar primer producto
        cy.get(':nth-child(1) > :nth-child(1) > .p-element > .p-checkbox > .p-checkbox-box').click();
        //asignar
        cy.get('.p-dialog-footer > .p-button-success').click();
        //direccion envio
        cy.get('#saleOrderShippingAddress').type(this.variable.direccionPagovalida);
        //cfdi
        cy.get(':nth-child(6) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').type(this.variable.cfdiValida);
        //escribir
        cy.get('.p-dropdown-filter')
        .type(this.variable.formaPagoValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //forma pago
        cy.get(':nth-child(7) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribir
        cy.get('.p-dropdown-filter')
        .type(this.variable.formaPagoValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //metodo pago
        cy.get(':nth-child(8) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //escribir
        cy.get('.p-dropdown-filter')
        .type(this.variable.formaPagoValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //notas
        cy.get('#saleOrderAdditionalComments').type(this.variable.notasValida);
        cy.intercept("POST", "http://localhost:1337/saleOrder/add").as(
            "añadirProducto"
        );
        cy.wait(sleepLargo);
        //boton guardar
        cy.get(".p-button-primary").click();
        cy.wait("@añadirProducto").its("response.statusCode").should("eq", 201);
        cy.url().should("eq", "http://localhost:4200/#/orders");
        cy.wait(sleepLargo);
    })
})