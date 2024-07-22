const sleepSuperCorto = 100;
const sleepCorto = 1000;
const sleepLargo = 3500;
describe("Orden de venta",function(){
    beforeEach(function(){
        cy.fixture("saleOrder").then(function (variable) {
            this.variable = variable;
        });
        cy.visit("/");
        cy.get("#email").type("admin@reportnow.com.mx");
        cy.get("#password").type("123456");
        cy.get('[label="CONTINUAR"]').click();
    })
    it("Crear orden de compra valida sin cotización con 2 producto: sim card, qbit",function(){
        //?CREAR ORDEN DE COMPRA
        //sección añadir provider
        //módulo administración
        cy.get('.p-element.ng-tns-c21-15').click();
        cy.wait(sleepSuperCorto)
        //ordenes
        cy.get('.p-element.ng-tns-c21-21').click();
        cy.wait(sleepSuperCorto)
        //de compra
        cy.get('.ng-tns-c21-26.ng-tns-c21-21 > .p-element').click();
        cy.wait(sleepSuperCorto)
        //boton agregar
        cy.get('.my-2 > .p-button-success').click();
        cy.wait(sleepSuperCorto)
        //nombre
        cy.get("#name").type(this.variable.descripcionValida);
        cy.wait(sleepSuperCorto)
        //proveedor
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //escribir proveedor
        cy.get('.p-dropdown-filter')
        .type(this.variable.proveedor)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //agregar producto
        cy.get(':nth-child(5) > .flex > p-button.p-element > .p-ripple').click();
        cy.wait(sleepSuperCorto)
        //producto 1
        cy.get(':nth-child(1) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //escribir producto
        cy.get('.p-dropdown-filter').type(this.variable.producto1)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //unidad
        cy.get(':nth-child(2) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //elegir "pieza"
        cy.get('[ng-reflect-label="Pieza"] > .p-ripple').click();
        cy.wait(sleepSuperCorto)
        //cantidad
        cy.get('#locale-us').type(this.variable.cantidad1);
        cy.wait(sleepSuperCorto)
        //precio
        cy.get(':nth-child(4) > .col-12 > .p-inputwrapper > .p-inputnumber > .p-inputtext').type(this.variable.precio);
        cy.wait(sleepSuperCorto)
        //agregar producto
        cy.get(':nth-child(5) > .flex > p-button.p-element > .p-ripple').click();
        cy.wait(sleepSuperCorto)
        //producto 2
        cy.get(':nth-child(1) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').last().click();
        cy.wait(sleepSuperCorto)
        //escribir producto
        cy.get('.p-dropdown-filter').type(this.variable.producto2)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //unidad
        cy.get(':nth-child(2) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').last().click();
        cy.wait(sleepSuperCorto)
        //elegir "pieza"
        cy.get('[ng-reflect-label="Pieza"] > .p-ripple').last().click();
        cy.wait(sleepSuperCorto)
        //cantidad
        cy.get('[ng-reflect-name="1"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').type(this.variable.cantidad2);
        cy.wait(sleepSuperCorto)
        //precio
        cy.get(':nth-child(4) > .col-12 > .p-inputwrapper > .p-inputnumber > .p-inputtext').last().type(this.variable.precio);
        cy.wait(sleepSuperCorto)
        //boton guardar
        cy.get(".p-button-primary").click();
        cy.wait(sleepLargo);
    })
    it("Abastecer compra válida con 2 productos",function(){
        //?CREAR ORDEN DE COMPRA
        //sección añadir provider
        //módulo administración
        cy.get('.p-element.ng-tns-c21-15').click();
        cy.wait(sleepSuperCorto)
        //ordenes
        cy.get('.p-element.ng-tns-c21-21').click();
        cy.wait(sleepSuperCorto)
        //de compra
        cy.get('.ng-tns-c21-26.ng-tns-c21-21 > .p-element').click();
        cy.wait(sleepSuperCorto)
        //id
        cy.get(':nth-child(1) > .p-highlight').click();
        cy.wait(sleepSuperCorto)
        //boton abastecer
        cy.get(":nth-child(1) > :nth-child(6) > .flex > .p-button-success")
            .first()
            .click();
        cy.wait(sleepSuperCorto)
        //observaciones
        cy.get("#reason").type("eb");
        cy.wait(sleepSuperCorto)
        cy.get(".p-button-primary").click();
        cy.wait(sleepSuperCorto)
        //switch abastecer por lote
        cy.get('.p-inputswitch-slider').click();
        cy.wait(sleepSuperCorto)
        //asignar persona
        cy.get(
            ".field > .p-inputwrapper > .p-dropdown > .p-dropdown-label"
        ).click();
        cy.wait(sleepSuperCorto)
        //elijo "administrador"
        cy.get(".p-element.ng-star-inserted > .p-ripple").click();
        cy.wait(sleepSuperCorto)
        //producto 1
        //serial
        cy.get('[ng-reflect-name="0"] > :nth-child(2) > .col-12 > #key').type(
            this.variable.serial1
        );
        cy.wait(sleepSuperCorto)
        //ubicacion
        cy.get('[ng-reflect-name="0"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(200)
        cy.get('.p-dropdown-filter')
        .type("Oficina")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //estado
        cy.get('[ng-reflect-name="0"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //elegir "disponible"
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        cy.wait(sleepSuperCorto)
        //producto 2
        //serial
        cy.get('[ng-reflect-name="1"] > :nth-child(2) > .col-12 > #key').type(
            this.variable.serial2
        );
        cy.wait(sleepSuperCorto)
        //ubicacion
        cy.get('[ng-reflect-name="1"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(200)
        cy.get('.p-dropdown-filter')
        .type("Oficina")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //estado
        cy.get('[ng-reflect-name="1"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //elegir "disponible"
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        cy.wait(sleepSuperCorto)
        //producto 3
        //serial
        cy.get('[ng-reflect-name="2"] > :nth-child(2) > .col-12 > #key').type(
            this.variable.serial3
        );
        cy.wait(sleepSuperCorto)
        //ubicacion
        cy.get('[ng-reflect-name="2"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(200)
        cy.get('.p-dropdown-filter')
        .type("Oficina")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //estado
        cy.get('[ng-reflect-name="2"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //elegir "disponible"
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        cy.wait(sleepSuperCorto)
        //producto 4
        //serial
        cy.get('[ng-reflect-name="3"] > :nth-child(2) > .col-12 > #key').type(
            this.variable.serial4
        );
        cy.wait(sleepSuperCorto)
        //ubicacion
        cy.get('[ng-reflect-name="3"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(200)
        cy.get('.p-dropdown-filter')
        .type("Oficina")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //estado
        cy.get('[ng-reflect-name="3"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //elegir "disponible"
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        cy.wait(sleepSuperCorto)
        //producto 5
        //serial
        cy.get('[ng-reflect-name="4"] > :nth-child(2) > .col-12 > #key').type(
            this.variable.serial5
        );
        cy.wait(sleepSuperCorto)
        //ubicacion
        cy.get('[ng-reflect-name="4"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(200)
        cy.get('.p-dropdown-filter')
        .type("Oficina")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //estado
        cy.get('[ng-reflect-name="4"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //elegir "disponible"
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        cy.wait(sleepSuperCorto)
        //producto 6
        //serial
        cy.get('[ng-reflect-name="5"] > :nth-child(2) > .col-12 > #key').type(
            this.variable.serial6
        );
        cy.wait(sleepSuperCorto)
        //ubicacion
        cy.get('[ng-reflect-name="5"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(200)
        cy.get('.p-dropdown-filter')
        .type("Oficina")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //estado
        cy.get('[ng-reflect-name="5"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //elegir "disponible"
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        cy.wait(sleepSuperCorto)
        //producto 7
        //serial
        cy.get('[ng-reflect-name="6"] > :nth-child(2) > .col-12 > #key').type(
            this.variable.serial7
        );
        cy.wait(sleepSuperCorto)
        //ubicacion
        cy.get('[ng-reflect-name="6"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(200)
        cy.get('.p-dropdown-filter')
        .type("Oficina")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //estado
        cy.get('[ng-reflect-name="6"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //elegir "disponible"
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        cy.wait(sleepSuperCorto)
        //producto 8
        //serial
        cy.get('[ng-reflect-name="7"] > :nth-child(2) > .col-12 > #key').type(
            this.variable.serial8
        );
        cy.wait(sleepSuperCorto)
        //ubicacion
        cy.get('[ng-reflect-name="7"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(200)
        cy.get('.p-dropdown-filter')
        .type("Oficina")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //estado
        cy.get('[ng-reflect-name="7"] > :nth-child(4) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //elegir "disponible"
        cy.get('[ng-reflect-label="Disponible"] > .p-ripple').click();
        cy.wait(sleepSuperCorto)
        //boton abastecer
        cy.get("#p-tabpanel-0 > .mt-4 > .p-button-primary").click();
        cy.wait(sleepLargo);
    })
    it("Crear cotizacion de venta válida",function(){
        //módulo administración
        cy.get('.p-element.ng-tns-c21-15').click();
        cy.wait(sleepSuperCorto)
        //módulo cotizaciones
        cy.get('.p-element.ng-tns-c21-20').click();
        cy.wait(sleepSuperCorto)
        //venta
        cy.get('.ng-tns-c21-23.ng-tns-c21-20 > .p-element').click();
        cy.wait(sleepSuperCorto)
        //boton agregar
        cy.get('.p-button-success').click();
        cy.wait(sleepSuperCorto)
        //descripcion
        cy.get('#name').type(this.variable.descripcionValida);
        cy.wait(sleepSuperCorto)
        //cliente
        cy.get(':nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //escribri "mattel"
        cy.get('.p-dropdown-filter')
        .type(this.variable.clienteValida)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //garantia
        cy.get('.p-inputswitch-slider').click();
        cy.wait(sleepSuperCorto)
        //tipo condiciones comerciales
        cy.get(':nth-child(5) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //escribir "equipo"
        cy.get('.p-dropdown-filter')
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //tipo moneda
        cy.get('#pr_id_13_label').click();
        cy.wait(sleepSuperCorto)
        cy.get('.p-dropdown-filter').last()
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //agregar producto
        cy.get(':nth-child(8) > .flex > p-button.p-element > .p-ripple').click();
        cy.wait(sleepSuperCorto)
        //producto
        cy.get('.col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //escribrir "sim card"
        cy.get('.p-dropdown-filter')
        .type("sim card")
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //cantidad
        cy.get(':nth-child(3) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').type(this.variable.cantidadValida);
        cy.wait(sleepSuperCorto)
        //descuento
        cy.get(':nth-child(4) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').type(this.variable.descuentoValida);
        cy.wait(sleepSuperCorto)
        //porcentaje
        cy.get('.p-checkbox-box').first().click();
        cy.wait(sleepSuperCorto)
        //agregar servicio
        cy.get(':nth-child(9) > .flex > p-button.p-element > .p-ripple').click();
        cy.wait(sleepSuperCorto)
        //servicio
        cy.get(':nth-child(1) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').last().click();
        cy.wait(sleepSuperCorto)
        //escribir "Instalacion"
        cy.get('.p-dropdown-filter')
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //cantidad
        cy.get(':nth-child(3) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').last().type(this.variable.cantidadValida);
        cy.wait(sleepSuperCorto)
        //descuento
        cy.get(':nth-child(4) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').last().type(this.variable.descuentoValida);
        cy.wait(sleepSuperCorto)
        //agregar paquete
        cy.get(':nth-child(10) > .flex > p-button.p-element > .p-ripple').click();
        cy.wait(sleepSuperCorto);
        //paquete
        cy.get('.col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').last().click();
        cy.wait(sleepSuperCorto);
        //escribir "PAQUETE"
        cy.get('.p-dropdown-filter')
        .type(this.variable.paquete)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto);
        //cantidad
        cy.get(':nth-child(3) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').last().type(this.variable.cantidadValida);
        cy.wait(sleepSuperCorto);
        //descuento
        cy.get(':nth-child(4) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').last().type(this.variable.descuentoValida);
        cy.wait(sleepSuperCorto)
        //descuento general
        //cy.get('.mt-5 > .p-inputwrapper > .p-inputnumber > #locale-us').type(this.variable.descuentoGeneralValida);
        //boton guardar
        cy.get('.p-button-primary').click();
        cy.wait(sleepLargo)
    })
    it("Aceptar cotizacion valida",function(){
        //módulo administración
        cy.get('.p-element.ng-tns-c21-15').click();
        cy.wait(sleepSuperCorto)
        //módulo cotizaciones
        cy.get('.p-element.ng-tns-c21-20').click();
        cy.wait(sleepSuperCorto)
        //venta
        cy.get('.ng-tns-c21-23.ng-tns-c21-20 > .p-element').click();
        cy.wait(sleepSuperCorto)
        //ocultar barra de navegacion
        cy.get('.menu-button > .pi').click();
        cy.wait(sleepSuperCorto)
        //estado
        cy.get('[psortablecolumn="quotationSaleStatus"]').click();
        cy.wait(sleepSuperCorto)
        //aceptar cotización
        cy.get(':nth-child(1) > :nth-child(8) > .flex > .p-button-success > .p-button-icon').click();
        cy.wait(sleepSuperCorto)
        //aceptar
        cy.get('.p-confirm-dialog-accept').click();
        cy.wait(sleepLargo)
    })
    it("Reanudar orden de venta valida",function(){
        //sección añadir provider
        //módulo administración
        cy.get('.p-element.ng-tns-c21-15').click();
        cy.wait(sleepSuperCorto)
        //ordenes
        cy.get('.p-element.ng-tns-c21-21').click();
        cy.wait(sleepSuperCorto)
        //venta
        cy.get('.ng-tns-c21-25.ng-tns-c21-21 > .p-element').click()
        cy.wait(sleepSuperCorto)
        //id
        cy.get(':nth-child(1) > .p-highlight').click();
        cy.wait(sleepSuperCorto)
        //reanudar venta
        cy.get(':nth-child(1) > :nth-child(9) > .flex > .p-button-help > .p-button-icon').click();
        cy.wait(sleepSuperCorto)
        //boton asignar del primer producto
        cy.get(':nth-child(2) > .col-3 > .p-element').click();
        cy.wait(sleepSuperCorto)
        //seleccionar primer serial
        cy.get(':nth-child(1) > :nth-child(1) > .p-element > .p-checkbox > .p-checkbox-box').click();
        cy.wait(sleepSuperCorto)
        //seleccionar segundo serial
        cy.get(':nth-child(2) > :nth-child(1) > .p-element > .p-checkbox > .p-checkbox-box').click();
        cy.wait(sleepSuperCorto)
        //boton asignar
        cy.get('.p-dialog-footer > .p-button-success').click();
        cy.wait(sleepSuperCorto)
        //boton asignar del segundo producto
        cy.get(':nth-child(3) > .col-3 > .p-element').click();
        cy.wait(sleepSuperCorto)
        //seleccionar primer serial
        cy.get(':nth-child(1) > :nth-child(1) > .p-element > .p-checkbox > .p-checkbox-box').click();
        cy.wait(sleepSuperCorto)
        //seleccionar segundo serial
        cy.get(':nth-child(2) > :nth-child(1) > .p-element > .p-checkbox > .p-checkbox-box').click();
        cy.wait(sleepSuperCorto)
        //seleccionar tercer serial
        cy.get(':nth-child(3) > :nth-child(1) > .p-element > .p-checkbox > .p-checkbox-box').click();
        cy.wait(sleepSuperCorto)
        //seleccionar cuarto serial
        cy.get(':nth-child(4) > :nth-child(1) > .p-element > .p-checkbox > .p-checkbox-box').click();
        cy.wait(sleepSuperCorto)
        //boton asignar
        cy.get('.p-dialog-footer > .p-button-success').click();
        cy.wait(sleepSuperCorto)
        //direccion envio
        cy.get('#saleOrderShippingAddress').type(this.variable.direccionPagovalida);
        cy.wait(sleepSuperCorto)
        //cfdi
        cy.get(':nth-child(6) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //escribir
        cy.get('.p-dropdown-filter')
        .type(this.variable.cfdiValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //forma pago
        cy.get(':nth-child(7) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //escribir
        cy.get('.p-dropdown-filter')
        .type(this.variable.formaPagoValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //metodo pago
        cy.get(':nth-child(8) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //escribir
        cy.get('.p-dropdown-filter')
        .type(this.variable.metodoPagoValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //notas
        cy.get('#saleOrderAdditionalComments').type(this.variable.notasValida);
        cy.wait(sleepSuperCorto)
        cy.intercept("PUT", "http://localhost:1337/saleOrder/update").as(
            "añadirProducto"
        );
        cy.wait(sleepLargo);
        //boton guardar
        cy.get(".p-button-primary").click();
        cy.wait(sleepSuperCorto)
        cy.wait("@añadirProducto").its("response.statusCode").should("eq", 200);
        cy.url().should("eq", "http://localhost:4200/#/saleOrders");
        cy.wait(sleepLargo);
        //id de la tabla del listado de ubicaciones
        cy.get('.p-highlight > .p-element').click();
        cy.wait(sleepSuperCorto)
        //primer fila, columna nombre
        cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(8)')
        .contains("terminada")
        .should("be.visible");
    })
    it("Crear cotización de venta con 1 producto",function(){
        //módulo administración
        cy.get('.p-element.ng-tns-c21-15').click();
        cy.wait(sleepSuperCorto)
        //módulo cotizaciones
        cy.get('.p-element.ng-tns-c21-20').click();
        cy.wait(sleepSuperCorto)
        //venta
        cy.get('.ng-tns-c21-23.ng-tns-c21-20 > .p-element').click();
        cy.wait(sleepSuperCorto)
        //boton agregar
        cy.get('.p-button-success').click();
        cy.wait(sleepSuperCorto)
        //descripcion
        cy.get('#name').type(this.variable.descripcion2Valida);
        cy.wait(sleepSuperCorto)
        //cliente
        cy.get(':nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //escribri "mattel"
        cy.get('.p-dropdown-filter')
        .type(this.variable.clienteValida)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //garantia
        cy.get('.p-inputswitch-slider').click();
        cy.wait(sleepSuperCorto)
        //tipo condiciones comerciales
        cy.get(':nth-child(5) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //escribir "equipo"
        cy.get('.p-dropdown-filter')
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //tipo moneda
        cy.get('#pr_id_13_label').click();
        cy.wait(sleepSuperCorto)
        cy.get('.p-dropdown-filter').last()
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //agregar producto
        cy.get(':nth-child(8) > .flex > p-button.p-element > .p-ripple').click();
        cy.wait(sleepSuperCorto)
        //producto
        cy.get('.col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.wait(sleepSuperCorto)
        //escribrir "qbit"
        cy.get('.p-dropdown-filter')
        .type(this.variable.producto2)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //cantidad
        cy.get(':nth-child(3) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').type(this.variable.cantidad1);
        cy.wait(sleepSuperCorto)
        //boton guardar
        cy.get('.p-button-primary').click();
        cy.wait(sleepLargo)
    })
    it("Aceptar cotizacion valida",function(){
        //módulo administración
        cy.get('.p-element.ng-tns-c21-15').click();
        cy.wait(sleepSuperCorto)
        //módulo cotizaciones
        cy.get('.p-element.ng-tns-c21-20').click();
        cy.wait(sleepSuperCorto)
        //venta
        cy.get('.ng-tns-c21-23.ng-tns-c21-20 > .p-element').click();
        cy.wait(sleepSuperCorto)
        //ocultar barra de navegacion
        cy.get('.menu-button > .pi').click();
        cy.wait(sleepSuperCorto)
        //estado
        cy.get('[psortablecolumn="quotationSaleStatus"]').click();
        cy.wait(sleepSuperCorto)
        //aceptar cotización
        cy.get(':nth-child(1) > :nth-child(8) > .flex > .p-button-success > .p-button-icon').click();
        cy.wait(sleepSuperCorto)
        //aceptar
        cy.get('.p-confirm-dialog-accept').click();
        cy.wait(sleepLargo)
    })
    it("Reanudar orden de venta después dejarla en pendiente",function(){
        //sección añadir provider
        //módulo administración
        cy.get('.p-element.ng-tns-c21-15').click();
        cy.wait(sleepSuperCorto)
        //ordenes
        cy.get('.p-element.ng-tns-c21-21').click();
        cy.wait(sleepSuperCorto)
        //venta
        cy.get('.ng-tns-c21-25.ng-tns-c21-21 > .p-element').click()
        cy.wait(sleepSuperCorto)
        //id
        cy.get(':nth-child(1) > .p-highlight').click();
        cy.wait(sleepSuperCorto)
        //reanudar venta
        cy.get(':nth-child(1) > :nth-child(9) > .flex > .p-button-help > .p-button-icon').click();
        cy.wait(sleepSuperCorto)
        //boton asignar del primer producto
        cy.get(':nth-child(2) > .col-3 > .p-element').click();
        cy.wait(sleepSuperCorto)
        //seleccionar primer serial
        cy.get(':nth-child(1) > :nth-child(1) > .p-element > .p-checkbox > .p-checkbox-box').click();
        cy.wait(sleepSuperCorto)
        //boton asignar
        cy.get('.p-dialog-footer > .p-button-success').click();
        cy.wait(sleepSuperCorto)
        //direccion envio
        cy.get('#saleOrderShippingAddress').type(this.variable.direccionPagovalida);
        cy.wait(sleepLargo);
        //boton guardar
        cy.get(".p-button-primary").click();
        cy.wait(sleepLargo);
        //id de la tabla del listado de ubicaciones
        cy.get('.p-highlight > .p-element').click();
        cy.wait(sleepSuperCorto)
        //primer fila, columna nombre
        cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(8)')
        .contains("pendiente")
        .should("be.visible");
    })
    it("Reanudar orden de venta sin productos sólo servicios",function(){
        //sección añadir provider
        //módulo administración
        cy.get('.p-element.ng-tns-c21-15').click();
        cy.wait(sleepSuperCorto)
        //ordenes
        cy.get('.p-element.ng-tns-c21-21').click();
        cy.wait(sleepSuperCorto)
        //venta
        cy.get('.ng-tns-c21-25.ng-tns-c21-21 > .p-element').click()
        cy.wait(sleepSuperCorto)
        //id
        cy.get(':nth-child(1) > .p-highlight').click();
        cy.wait(sleepSuperCorto)
        //reanudar venta
        cy.get(':nth-child(1) > :nth-child(9) > .flex > .p-button-help > .p-button-icon').click();
        cy.wait(sleepSuperCorto)
        //boton asignar del primer producto
        cy.get(':nth-child(2) > .col-3 > .p-element').click();
        cy.wait(sleepSuperCorto)
        //seleccionar primer serial
        cy.get(':nth-child(1) > :nth-child(1) > .p-element > .p-checkbox > .p-checkbox-box').click();
        cy.wait(sleepSuperCorto)
        //boton asignar
        cy.get('.p-dialog-footer > .p-button-success').click();
        cy.wait(sleepLargo);
        //boton guardar
        cy.get(".p-button-primary").click();
        cy.wait(sleepLargo);
        //id de la tabla del listado de ubicaciones
        cy.get('.p-highlight > .p-element').click();
        cy.wait(sleepSuperCorto)
        //primer fila, columna nombre
        cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(8)')
        .contains("terminada")
        .should("be.visible");
    })
})