const sleepCorto = 1000;
const sleepLargo = 3500;
const sleepSuperCorto = 100;
describe("Instalaciones",function(){
    beforeEach(function(){
        cy.fixture("trackerInstallations").then(function (variable) {
            this.variable = variable;
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
        //tipo moneda
        cy.get(':nth-child(5) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar MXN
        cy.get('[ng-reflect-label="Peso mexicano (MXN)"] > .p-ripple')
        .click()
        //añadir producto
        cy.get(':nth-child(6) > .flex > p-button.p-element > .p-ripple')
        .click()
        //producto
        cy.get(':nth-child(1) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click()
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
        cy.get('[ng-reflect-name="0"] > :nth-child(3) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').type(this.variable.cantidad);
        //precio
        cy.get(':nth-child(4) > .col-12 > .p-inputwrapper > .p-inputnumber > .p-inputtext').type(this.variable.precio);
        //añadir producto
        cy.get(':nth-child(6) > .flex > p-button.p-element > .p-ripple')
        .click()
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
        //boton guardar
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
        cy.wait(sleepLargo);
        cy.get(".p-button-primary").click();
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
        //seleccionar costumer
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
        //se selecciona
        cy.get('.p-dropdown-filter')
        .type(this.variable.productoVender)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.wait(sleepSuperCorto)
        //cantidad
        cy.get(':nth-child(3) > .col-12 > .p-inputwrapper > .p-inputnumber > #locale-us').type(this.variable.cantidadValida);
        cy.wait(sleepCorto)
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
        cy.get(':nth-child(3) > :nth-child(1) > .p-element > .p-checkbox > .p-checkbox-box').click();
        //boton asignar
        cy.get('.p-dialog-footer > .p-button-success')
        .click()
        //direccion envio
        cy.get('#saleOrderShippingAddress').type(this.variable.direccionPagovalida);
        //boton guardar
        cy.get(".p-button-primary").click();
        cy.wait(sleepLargo);
    })
    it("Añadir Producto válido de tipo accesorio", function () {
        //módulo inventario
        cy.get(".p-element.ng-tns-c21-16").click();
        //módulo productos
        cy.get('.ng-tns-c21-29.ng-tns-c21-16 > .p-element > .layout-menuitem-text').click();
        cy.get(".p-button-success").click();
        //formulario
        //marca
        cy.get("#brand").type(this.variable.marca);
        cy.wait(sleepCorto);
        //modelo
        cy.get("#model").type(this.variable.modelo);
        //descripcion
        cy.get("#description").type(this.variable.descripcionProducto);
        //categoría
        cy.get(":nth-child(4) > .p-inputwrapper > .p-dropdown > .p-dropdown-label")
        .click();
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //tipo moneda
        cy.get(':nth-child(1) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar dolares
        cy.get('[ng-reflect-label="Dólar estadounidense (USD)"] > .p-ripple')
        .click()
        //precio
        cy.get('#price > .p-inputnumber > #locale-us')
        .type(this.variable.precio);
        cy.wait(sleepCorto);
        //garantia para el cliente
        cy.get('.col-2 > .p-inputwrapper > .p-inputnumber > #locale-us')
        .type(this.variable.garantia);
        //temporalidad
        cy.get(":nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label")
        .click();
        cy.get("[ng-reflect-label='Día(s)'] > .p-ripple").click();
        cy.get(
            ":nth-child(4) > .p-element > .p-radiobutton > .p-radiobutton-box"
        ).click();
        cy.wait(sleepLargo);
        cy.get(".p-button-primary").click();
        cy.wait(sleepLargo);
    });
    it("Añadir Vehículo válido",function(){
       //módulo instalaciones
       cy.get('.p-element.ng-tns-c21-34').click();
       //módulo vehiculos
       cy.get('.ng-tns-c21-37.ng-tns-c21-34 > .p-element').click();
       //boton agregar
        cy.get('.p-button-success').click();
        //cliente
        cy.get('.p-dropdown-label').click();
        cy.get('[formControlName="vehicleCostumerId"]').type(this.variable.clienteValido)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        cy.get('#vehicleBrand').type(this.variable.marcaValido);
        cy.get('#vehicleModel').type(this.variable.modeloValido);
        cy.get('#vehicleYear').type(this.variable.anoValido);
        cy.get('#vehicleVin').type(this.variable.vinValido);
        cy.get('#vehiclePlateNumber').type(this.variable.placaValido);
        cy.get('#vehicleColor').type(this.variable.colorValido);
        //boton guardar
        cy.get('.p-button-primary').click();
        cy.wait(sleepLargo)
    })
    it("Crear instalación valida",function(){
       //módulo instalaciones
       cy.get('.p-element.ng-tns-c21-34').click();
       //módulo instalaciones
       cy.get('.ng-tns-c21-38.ng-tns-c21-34 > .p-element')
       .click();
       //boton agregar
        cy.get('.p-button-success').click();
        cy.wait(sleepSuperCorto)
        //cliente
        cy.get(':nth-child(1) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar cliente costumer
        cy.get('.p-dropdown-filter')
        .type(this.variable.clienteValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //vehiculo
        cy.get('.field.ng-star-inserted > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //escribir vehiculo
        cy.get('.p-dropdown-filter')
        .type(this.variable.vinValido)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //rastreador
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar imei
        cy.get('.p-dropdown-filter')
        .type(this.variable.serialGPS)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //instalador
        cy.get(':nth-child(4) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar imei
        cy.get('.p-dropdown-filter')
        .type(this.variable.instalador)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //fecha instalación
        cy.get('.p-calendar > .p-inputtext')
        .click()
        //seleccionar día 7
        cy.get('tbody.ng-tns-c88-63 > :nth-child(2) > :nth-child(4) > .p-ripple')
        .click()
        //paro de motor
        cy.get('.p-inputswitch-slider')
        //tipo corte
        cy.get('.p-autocomplete-input')
        .wait(200)
        .type(this.variable.tipoCorteValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //ubicacion rastreador
        cy.get('#trackerInstallationLocation')
        .type(this.variable.ubicacionRastreadorValida)
        //agregar accesorio
        cy.get('p-button.p-element > .p-ripple')
        .click()
        //accesorio
        cy.get('.col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar accesorio
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type(this.variable.modelo)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //observaciones
        cy.get('#trackerInstallationObservation')
        .type(this.variable.observacionesValida)
        //interceptar peticion
        cy.intercept("POST","http://localhost:1337/trackerInstallation/add")
        .as("añadir");
        //boton guardar
        cy.get('.p-button-primary').click();
        cy.wait("@añadir").its("response.statusCode").should("eq",201);
        cy.url().should("eq","http://localhost:4200/#/trackerInstallations");
        //id de la tabla del listado de ubicaciones
        cy.get('.p-highlight > .p-element').click();
        //primer fila, columna nombre
        cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(3)')
        .contains(this.variable.serialGPS)
        .should("be.visible");
        cy.wait(sleepLargo);
    })
    it("Crear instalación invalida por exceso de caracteres",function(){
       //módulo instalaciones
       cy.get('.p-element.ng-tns-c21-34').click();
       //módulo instalaciones
       cy.get('.ng-tns-c21-38.ng-tns-c21-34 > .p-element')
       .click();
       //boton agregar
        cy.get('.p-button-success').click();
        cy.wait(sleepSuperCorto)
        //cliente
        cy.get(':nth-child(1) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar cliente costumer
        cy.get('.p-dropdown-filter')
        .type(this.variable.clienteValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //vehiculo
        cy.get('.field.ng-star-inserted > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //escribir vehiculo
        cy.get('.p-dropdown-filter')
        .type(this.variable.vinValido)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //rastreador
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar imei
        cy.get('.p-dropdown-filter')
        .type(this.variable.serialGPS)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //instalador
        cy.get(':nth-child(4) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar imei
        cy.get('.p-dropdown-filter')
        .type(this.variable.instalador)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //fecha instalación
        cy.get('.p-calendar > .p-inputtext')
        .click()
        //seleccionar día 7
        cy.get('tbody.ng-tns-c88-63 > :nth-child(2) > :nth-child(4) > .p-ripple')
        .click()
        //paro de motor
        cy.get('.p-inputswitch-slider')
        //tipo corte
        cy.get('.p-autocomplete-input')
        .wait(200)
        .type(this.variable.tipoCorteInvalida)
        //ubicacion rastreador
        cy.get('#trackerInstallationLocation')
        .type(this.variable.ubicacionRastreadorInvalida)
        //agregar accesorio
        cy.get('p-button.p-element > .p-ripple')
        .click()
        //accesorio
        cy.get('.col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar accesorio
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type(this.variable.modelo)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //observaciones
        cy.get('#trackerInstallationObservation')
        .type(this.variable.observacionesValida)
        //boton guardar
        cy.get('.p-button-primary').click();
        cy.url().should("eq","http://localhost:4200/#/trackerInstallations/add");
        cy.wait(sleepLargo);
    })
    it("Crear instalación invalida por accesorio duplicado",function(){
       //módulo instalaciones
       cy.get('.p-element.ng-tns-c21-34').click();
       //módulo instalaciones
       cy.get('.ng-tns-c21-38.ng-tns-c21-34 > .p-element')
       .click();
       //boton agregar
        cy.get('.p-button-success').click();
        cy.wait(sleepSuperCorto)
        //cliente
        cy.get(':nth-child(1) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar cliente costumer
        cy.get('.p-dropdown-filter')
        .type(this.variable.clienteValida)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //vehiculo
        cy.get('.field.ng-star-inserted > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //escribir vehiculo
        cy.get('.p-dropdown-filter')
        .type(this.variable.vinValido)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //rastreador
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar imei
        cy.get('.p-dropdown-filter')
        .type(this.variable.serialGPS)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //instalador
        cy.get(':nth-child(4) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar imei
        cy.get('.p-dropdown-filter')
        .type(this.variable.instalador)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //fecha instalación
        cy.get('.p-calendar > .p-inputtext')
        .click()
        //seleccionar día 7
        cy.get('tbody.ng-tns-c88-63 > :nth-child(2) > :nth-child(4) > .p-ripple')
        .click()
        //paro de motor
        cy.get('.p-inputswitch-slider')
        //tipo corte
        cy.get('.p-autocomplete-input')
        .wait(200)
        .type(this.variable.tipoCorteValida)
        //ubicacion rastreador
        cy.get('#trackerInstallationLocation')
        .type(this.variable.ubicacionRastreadorValida)
        //agregar accesorio
        cy.get('p-button.p-element > .p-ripple')
        .click()
        //accesorio
        cy.get('.col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar accesorio
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type(this.variable.modelo)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //agregar accesorio 2
        cy.get('p-button.p-element > .p-ripple')
        .click()
        //accesorio 2
        cy.get('.ng-untouched.ng-star-inserted > :nth-child(1) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar accesorio
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type(this.variable.modelo)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //observaciones
        cy.get('#trackerInstallationObservation')
        .type(this.variable.observacionesValida)
        //boton guardar
        cy.get('.p-button-primary').click();
        cy.url().should("eq","http://localhost:4200/#/trackerInstallations/add");
        cy.wait(sleepLargo);
    })
    it("Crear instalación invalida por accesorio duplicado",function(){
       //módulo instalaciones
       cy.get('.p-element.ng-tns-c21-34').click();
       //módulo instalaciones
       cy.get('.ng-tns-c21-38.ng-tns-c21-34 > .p-element')
       .click();
       //boton agregar
        cy.get('.p-button-success').click();
        cy.wait(sleepSuperCorto)
        //boton guardar
        cy.get('.p-button-primary').click();
        cy.url().should("eq","http://localhost:4200/#/trackerInstallations/add");
        cy.wait(sleepLargo);
    })
})