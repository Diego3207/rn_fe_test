const sleepCorto = 1000;
const sleepLargo = 2500;
describe("Incidencias",function(){
    beforeEach(function(){
        cy.fixture("incidences").then(function (incidences) {
            this.incidences = incidences;
        });
        cy.visit("/");
        cy.get("#email").type("admin@reportnow.com.mx");
        cy.get("#password").type("123456");
        cy.get('[label="CONTINUAR"]').click();
    })
    it("Añadir Incidencia válido",function(){
        //módulo operativo
        cy.get('.p-element.ng-tns-c21-44').click();
        //módulo incidencias
        cy.get('.ng-tns-c21-48.ng-tns-c21-44 > .p-element').click();
        //agregar
        cy.get('.p-button-success').click();
        cy.wait(300)
        //cliente
        cy.get(':nth-child(1) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //elegir cliente
        cy.get('.p-dropdown-filter')
        .type(this.incidences.clienteValido)
        .wait(400)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //informante
        cy.get(':nth-child(2) > :nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click();
        //seleccionar cliente
        cy.get('[ng-reflect-label="Cliente"] > .p-ripple')
        .click()
        //via comunicacion informante
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar whatsapp
        cy.get('[ng-reflect-label="WhatsApp"] > .p-ripple')
        .click()
        //datos informante
        cy.get('#name')
        .type(this.incidences.datosInformanteValido)
        //tipo incidencia
        cy.get(':nth-child(3) > :nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()       
        //seleccionar preventiva
        cy.get('[ng-reflect-label="Preventiva"] > .p-ripple')
        .click()
        //clasificacion incidencia
        cy.get('.field.ng-star-inserted > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar activacion dispositivo
        cy.get('.p-element.ng-star-inserted > .p-ripple')
        .click()
        //descripcion hechos
        cy.get(':nth-child(4) > :nth-child(2) > .ng-untouched')
        .type(this.incidences.descripcionValido)
        //CAPTURA DE DATOS
        //seleccion de equipo
        cy.get(':nth-child(1) > .p-element > .p-checkbox > .p-checkbox-box')
        .click()
        //agregar persona involucrada
        cy.get(':nth-child(3) > .flex > p-button.p-element > .p-ripple')
        .click()
        //nombre
        cy.get('tr.p-element > :nth-child(1) > div > .p-inputtext')
        .type(this.incidences.nombreValido)
        //sexo
        cy.get('#pr_id_21_label')
        .click()
        //seleccionar femenino
        cy.get('[ng-reflect-label="Femenino"] > .p-ripple')
        .click()
        //edad
        cy.get('.p-inputnumber > .p-inputtext')
        .type(this.incidences.edadValido)
        //fecha nacimiento
        cy.get(':nth-child(4) > div > .p-inputwrapper > .p-calendar > .p-inputtext')
        .click()
        //seleccionar 10
        cy.get('tbody.ng-tns-c88-68 > :nth-child(2) > :nth-child(4) > .p-ripple')
        .click()
        //lugar nacimiento
        cy.get('[formControlName="incidencePeopleBirthPlace"]')
        .click()
        //escribir jalisco
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type(this.incidences.lugarNacimientoValido)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //domicilio particular
        cy.get('#incidencePeopleAddress')
        .type(this.incidences.domicilioValido)
        //señas particulares
        cy.get(':nth-child(7) > div > .p-inputtext')
        .type(this.incidences.señasParticulares)
        //agregar vehiculos involucrados
        cy.get(':nth-child(4) > .flex > p-button.p-element > .p-ripple')
        .click()
        //marca
        cy.get(':nth-child(1) > .col-20 > .p-inputtext')
        .type(this.incidences.marcaValido)
        //modelo
        cy.get(':nth-child(2) > .col-20 > .p-inputtext')
        .type(this.incidences.modeloValido)
        //placas
        cy.get(':nth-child(3) > .col-20 > .p-inputtext')
        .type(this.incidences.placaValido)
        //color
        cy.get(':nth-child(4) > .col-20 > .p-inputtext')
        .type(this.incidences.colorValido)
        //caracteristicas
        cy.get(':nth-child(5) > .col-20 > .p-inputtext')
        .type(this.incidences.caracteristicaValido)
        //añadir via coordinacion
        cy.get('.error-box > .flex-wrap > p-button.p-element > .p-ripple')
        .click()
        //telefono
        cy.get('.col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar telefono
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type(this.incidences.telefonoValido)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //via de comunicacion
        cy.get('.ng-invalid.ng-star-inserted > :nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar whatsapp
        cy.get('[ng-reflect-label="WhatsApp"] > .p-ripple')
        .click()
        //observaciones
        cy.get('.mt-5 > div > .ng-untouched')
        .type(this.incidences.observacionesValido)
        //validacion
        cy.get(':nth-child(4) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar falso positivo
        cy.get('[ng-reflect-label="Falso positivo"] > .p-ripple')
        .click()
        //fecha inicio
        cy.get('.grid > :nth-child(1) > .p-inputwrapper > .p-calendar > .p-inputtext')
        .click()
        //seleccionar 7
        cy.get('tbody.ng-tns-c88-59 > :nth-child(2) > :nth-child(1) > .p-ripple')
        .click()
        //fecha fin
        cy.get(':nth-child(2) > .p-inputwrapper > .p-calendar > .p-inputtext')
        .click()
        //seleccionar 9
        cy.get('tbody.ng-tns-c88-60 > :nth-child(2) > :nth-child(3) > .p-ripple')
        .click()
        cy.intercept("POST","http://localhost:1337/incidence/add").as("añadir");
        cy.wait(sleepLargo)
        //boton guardar
        cy.get('.p-button-primary').click();
        cy.wait("@añadir").its("response.statusCode").should("eq",201);
        cy.url().should("eq","http://localhost:4200/#/incidences");
        cy.wait(sleepLargo)
    })
    it("Añadir Incidencia inválido por duplicado",function(){
        //módulo operativo
        cy.get('.p-element.ng-tns-c21-44').click();
        //módulo incidencias
        cy.get('.ng-tns-c21-48.ng-tns-c21-44 > .p-element').click();
        //agregar
        cy.get('.p-button-success').click();
        cy.wait(300)
        //cliente
        cy.get(':nth-child(1) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //elegir cliente
        cy.get('.p-dropdown-filter')
        .type(this.incidences.clienteValido)
        .wait(400)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //informante
        cy.get(':nth-child(2) > :nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click();
        //seleccionar cliente
        cy.get('[ng-reflect-label="Cliente"] > .p-ripple')
        .click()
        //via comunicacion informante
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar whatsapp
        cy.get('[ng-reflect-label="WhatsApp"] > .p-ripple')
        .click()
        //datos informante
        cy.get('#name')
        .type(this.incidences.datosInformanteValido)
        //tipo incidencia
        cy.get(':nth-child(3) > :nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()       
        //seleccionar preventiva
        cy.get('[ng-reflect-label="Preventiva"] > .p-ripple')
        .click()
        //clasificacion incidencia
        cy.get('.field.ng-star-inserted > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar activacion dispositivo
        cy.get('.p-element.ng-star-inserted > .p-ripple')
        .click()
        //descripcion hechos
        cy.get(':nth-child(4) > :nth-child(2) > .ng-untouched')
        .type(this.incidences.descripcionValido)
        //CAPTURA DE DATOS
        //seleccion de equipo
        cy.get(':nth-child(1) > .p-element > .p-checkbox > .p-checkbox-box')
        .click()
        //agregar persona involucrada
        cy.get(':nth-child(3) > .flex > p-button.p-element > .p-ripple')
        .click()
        //nombre
        cy.get('tr.p-element > :nth-child(1) > div > .p-inputtext')
        .type(this.incidences.nombreValido)
        //sexo
        cy.get('#pr_id_21_label')
        .click()
        //seleccionar femenino
        cy.get('[ng-reflect-label="Femenino"] > .p-ripple')
        .click()
        //edad
        cy.get('.p-inputnumber > .p-inputtext')
        .type(this.incidences.edadValido)
        //fecha nacimiento
        cy.get(':nth-child(4) > div > .p-inputwrapper > .p-calendar > .p-inputtext')
        .click()
        //seleccionar 10
        cy.get('tbody.ng-tns-c88-68 > :nth-child(2) > :nth-child(4) > .p-ripple')
        .click()
        //lugar nacimiento
        cy.get('[formControlName="incidencePeopleBirthPlace"]')
        .click()
        //escribir jalisco
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type(this.incidences.lugarNacimientoValido)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //domicilio particular
        cy.get('#incidencePeopleAddress')
        .type(this.incidences.domicilioValido)
        //señas particulares
        cy.get(':nth-child(7) > div > .p-inputtext')
        .type(this.incidences.señasParticulares)
        //agregar vehiculos involucrados
        cy.get(':nth-child(4) > .flex > p-button.p-element > .p-ripple')
        .click()
        //marca
        cy.get(':nth-child(1) > .col-20 > .p-inputtext')
        .type(this.incidences.marcaValido)
        //modelo
        cy.get(':nth-child(2) > .col-20 > .p-inputtext')
        .type(this.incidences.modeloValido)
        //placas
        cy.get(':nth-child(3) > .col-20 > .p-inputtext')
        .type(this.incidences.placaValido)
        //color
        cy.get(':nth-child(4) > .col-20 > .p-inputtext')
        .type(this.incidences.colorValido)
        //caracteristicas
        cy.get(':nth-child(5) > .col-20 > .p-inputtext')
        .type(this.incidences.caracteristicaValido)
        //añadir via coordinacion
        cy.get('[id="botonAgregarViaCoordinacion"]')
        .click()
        //telefono
        cy.get('.col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar telefono
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type(this.incidences.telefonoValido)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //via de comunicacion
        cy.get('.ng-invalid.ng-star-inserted > :nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar whatsapp
        cy.get('[ng-reflect-label="WhatsApp"] > .p-ripple')
        .click()
        //añadir via coordinacion 2
        cy.get('[id="botonAgregarViaCoordinacion"]')
        .click()
        //telefono 2
        cy.get('.ng-untouched.ng-star-inserted > :nth-child(1) > .col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar telefono
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type(this.incidences.telefonoValido)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //via coordinacion 2
        cy.get('.ng-invalid.ng-star-inserted > :nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar whatsapp
        cy.get('[ng-reflect-label="WhatsApp"] > .p-ripple')
        .click()
        //observaciones
        cy.get('.mt-5 > div > .ng-untouched')
        .type(this.incidences.observacionesValido)
        //validacion
        cy.get(':nth-child(4) > .p-inputwrapper > .p-dropdown > .p-dropdown-label')
        .click()
        //seleccionar falso positivo
        cy.get('[ng-reflect-label="Falso positivo"] > .p-ripple')
        .click()
        //fecha inicio
        cy.get('.grid > :nth-child(1) > .p-inputwrapper > .p-calendar > .p-inputtext')
        .click()
        //seleccionar 7
        cy.get('tbody.ng-tns-c88-59 > :nth-child(2) > :nth-child(1) > .p-ripple')
        .click()
        //fecha fin
        cy.get(':nth-child(2) > .p-inputwrapper > .p-calendar > .p-inputtext')
        .click()
        //seleccionar 9
        cy.get('tbody.ng-tns-c88-60 > :nth-child(2) > :nth-child(3) > .p-ripple')
        .click()
        cy.wait(sleepLargo)
        //boton guardar
        cy.get('.p-button-primary').click();
        cy.url().should("eq","http://localhost:4200/#/incidences/add");
        cy.wait(sleepLargo)
    })
    /*
    it("Añadir Incidencia inválido por enviar equipo sin falla",function(){
        //módulo operativo
        cy.get('.p-element.ng-tns-c21-44').click();
        //módulo incidencias
        cy.get('.ng-tns-c21-48.ng-tns-c21-44 > .p-element').click();
        //agregar
        cy.get('.p-button-success').click();
        cy.wait(300)
        //cliente
        cy.get(':nth-child(1) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //elegir cliente
        cy.get('.p-dropdown-filter')
        .type(this.incidences.clienteValido)
        .wait(400)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //fuente información
        cy.get(':nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //elegir "personal del centro de monitoreo"
        cy.get('[ng-reflect-label="Personal del centro de monitor"] > .p-ripple').click();
        //datos informante
        cy.get(':nth-child(3) > #name').type(this.incidences.datosInformanteValido);
        //clasificación de incidencia
        cy.get(':nth-child(4) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        //elegir "operativa"
        cy.get('[ng-reflect-label="Operativa"] > .p-ripple').click();
        //cuadrante
        cy.get(':nth-child(5) > #name').type(this.incidences.cuadranteValido);
        //seleccionar primer dispositivo
        cy.get(':nth-child(1) > :nth-child(1) > .p-element > .p-checkbox > .p-checkbox-box').click();
        //fecha inicio
        cy.get(':nth-child(1) > .p-inputwrapper > .p-calendar > .p-inputtext').click();
        //día 10
        cy.get('tbody.ng-tns-c88-59 > :nth-child(2) > :nth-child(4) > .p-ripple').click();
        //fecha fin
        cy.get(':nth-child(2) > .p-inputwrapper > .p-calendar > .p-inputtext').click();
        //día 11
        cy.get('tbody.ng-tns-c88-60 > :nth-child(2) > :nth-child(5)').click();
        //descripcion hechos
        cy.get(':nth-child(8) > :nth-child(2) > .ng-untouched').type(this.incidences.descripcionValido);
        cy.wait(sleepLargo);
        //personas involucradas
        cy.get(':nth-child(9) > div > .ng-untouched').type(this.incidences.personaInvolucradaValido);
        //vehiculos involucrados
        cy.get(':nth-child(10) > div > .ng-untouched').type(this.incidences.vehiculoInvolucradoValido);
        //agregar via coordinación
        cy.get('p-button.p-element > .p-ripple').click();
        //elegir via
        cy.get('.col-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
        cy.get('.p-dropdown-filter')
        .type(this.incidences.viaCoordinacionValido)
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}");
        //evidencia
        cy.get('.p-fileupload-buttonbar > .p-ripple').click();
        cy.wait(3000)
        //observaciones
        cy.get(':nth-child(13) > div > .ng-untouched').type(this.incidences.observacionesValido);
        //validacion - falso positivo
        cy.get(':nth-child(2) > .p-element > .p-radiobutton > .p-radiobutton-box').click();
        cy.intercept("POST","http://localhost:1337/incidence/add").as("añadir");
        cy.wait(sleepLargo)
        //boton guardar
        cy.get('.p-button-primary').click();
        cy.wait("@añadir").its("response.statusCode").should("eq",201);
        cy.url().should("eq","http://localhost:4200/#/incidences");
    })
    */
    it.only("Añadir Incidencia inválido por enviar equipo sin falla",function(){
        //módulo operativo
        cy.get('.p-element.ng-tns-c21-44').click();
        //módulo incidencias
        cy.get('.ng-tns-c21-48.ng-tns-c21-44 > .p-element').click();
        //agregar
        cy.get('.p-button-success').click();
        cy.wait(sleepLargo)
        //boton guardar
        cy.get('.p-button-primary').click();
        cy.url().should("eq","http://localhost:4200/#/incidences/add");
    })
})