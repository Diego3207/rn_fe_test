const sleepCorto = 1000;
const sleepLargo = 3500;
describe("Áreas Operativas",function(){
    beforeEach(function(){
        cy.fixture("operationalArea").then(function (variable) {
            this.variable = variable;
        });
        cy.visit("/");
        cy.get("#email").type("admin@reportnow.com.mx");
        cy.get("#password").type("123456");
        cy.get('[label="CONTINUAR"]').click();
    })
    it("Crear Area operativa (Dirección) valida",function(){
        //módulo operativo
        cy.get('.p-element.ng-tns-c21-44').click();
        //módulo área operativa
        cy.get('.ng-tns-c21-50.ng-tns-c21-44 > .p-element').click()
        //boton guardar
        cy.get('.p-button-success').click()
        //identificador
        cy.get('form.ng-untouched > :nth-child(1) > .p-inputtext').type(this.variable.identificadorValido)
        //cliente
        cy.get(':nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click()
        //seleccionar primer cliente "Mattel"
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //tipo
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click()
        //seleccionar primera opción "Dirección"
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //calle
        cy.get(':nth-child(4) > :nth-child(1) > .p-inputtext')
        .type(this.variable.calleValido)
        //numero interno
        cy.get(':nth-child(2) > .p-inputtext')
        .type(this.variable.numeroInternoValido)
        //numero externo
        cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        .type(this.variable.numeroExternoValido)
        //colonia
        cy.get(':nth-child(4) > .p-inputtext')
        .type(this.variable.coloniaValido)
        //municipio
        cy.get(':nth-child(5) > .p-inputtext')
        .type(this.variable.municipioValido)
        //estado
        cy.get(':nth-child(6) > .p-inputtext')
        .type(this.variable.estadoValido)
        //codigo Postal
        cy.get(':nth-child(7) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        .type(this.variable.codigoPostalValido)
        //cruce 1
        cy.get(':nth-child(8) > .p-inputtext')
        .type(this.variable.cruce1Valido)
        //cruce 2
        cy.get(':nth-child(9) > .p-inputtext')
        .type(this.variable.cruce2Valido)
        //interceptar peticion
        cy.intercept("POST","http://localhost:1337/operationalArea/add").as("añadir")
        cy.wait(sleepLargo)
        //boton guardar
        cy.get('.p-button-primary').click()
        cy.wait(sleepLargo)
        //esperar respuesta
        cy.wait("@añadir").its("response.statusCode").should("eq",201)
        cy.url().should("eq","http://localhost:4200/#/operationalAreas")
        //id de la tabla del listado de ubicaciones
        cy.get('.p-highlight > .p-element').click();
        //primer fila, columna nombre
        cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(3)')
        .contains(this.variable.identificadorValido)
        .should("be.visible");
    })
    it("Crear Area operativa (Sucursal) valida",function(){
        //módulo operativo
        cy.get('.p-element.ng-tns-c21-44').click();
        //módulo área operativa
        cy.get('.ng-tns-c21-50.ng-tns-c21-44 > .p-element').click()
        //boton guardar
        cy.get('.p-button-success').click()
        //identificador
        cy.get('form.ng-untouched > :nth-child(1) > .p-inputtext').type(this.variable.identificadorValido)
        //cliente
        cy.get(':nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click()
        //seleccionar primer cliente "Mattel"
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //tipo
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click()
        //seleccionar primera opción "Dirección"
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //calle
        cy.get(':nth-child(4) > :nth-child(1) > .p-inputtext')
        .type(this.variable.calleValido)
        //numero interno
        cy.get(':nth-child(4) > :nth-child(2) > .p-inputtext')
        .type(this.variable.numeroInternoValido)
        //numero externo
        cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        .type(this.variable.numeroExternoValido)
        //colonia
        cy.get(':nth-child(4) > .p-inputtext')
        .type(this.variable.coloniaValido)
        //municipio
        cy.get(':nth-child(5) > .p-inputtext')
        .type(this.variable.municipioValido)
        //estado
        cy.get(':nth-child(6) > .p-inputtext')
        .type(this.variable.estadoValido)
        //codigo Postal
        cy.get(':nth-child(7) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        .type(this.variable.codigoPostalValido)
        //cruce 1
        cy.get(':nth-child(8) > .p-inputtext')
        .type(this.variable.cruce1Valido)
        //cruce 2
        cy.get(':nth-child(9) > .p-inputtext')
        .type(this.variable.cruce2Valido)
        //telefono de sucursal
        cy.get(':nth-child(5) > :nth-child(1) > .p-inputtext')
        .type(this.variable.telefonoSucursalValido)
        //persona responsable
        cy.get(':nth-child(5) > :nth-child(2) > .p-inputtext')
        .type(this.variable.personaResponsableValido)
        //interceptar peticion
        cy.intercept("POST","http://localhost:1337/operationalArea/add").as("añadir")
        cy.wait(sleepLargo)
        //boton guardar
        cy.get('.p-button-primary').click()
        cy.wait(sleepLargo)
        //esperar respuesta
        cy.wait("@añadir").its("response.statusCode").should("eq",201)
        cy.url().should("eq","http://localhost:4200/#/operationalAreas")
        //id de la tabla del listado de ubicaciones
        cy.get('.p-highlight > .p-element').click();
        //primer fila, columna nombre
        cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(3)')
        .contains(this.variable.identificadorValido)
        .should("be.visible");
    })
    it("Crear Area operativa (Cuadrante) valida",function(){
        //módulo operativo
        cy.get('.p-element.ng-tns-c21-44').click();
        //módulo área operativa
        cy.get('.ng-tns-c21-50.ng-tns-c21-44 > .p-element').click()
        //boton guardar
        cy.get('.p-button-success').click()
        //identificador
        cy.get('form.ng-untouched > :nth-child(1) > .p-inputtext').type(this.variable.identificadorValido)
        //cliente
        cy.get(':nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click()
        //seleccionar primer cliente "Mattel"
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //tipo
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click()
        //seleccionar primera opción "Dirección"
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //interceptar peticion
        cy.intercept("POST","http://localhost:1337/operationalArea/add").as("añadir")
        cy.wait(sleepLargo)
        //boton guardar
        cy.get('.p-button-primary').click()
        cy.wait(sleepLargo)
        //esperar respuesta
        cy.wait("@añadir").its("response.statusCode").should("eq",201)
        cy.url().should("eq","http://localhost:4200/#/operationalAreas")
        //id de la tabla del listado de ubicaciones
        cy.get('.p-highlight > .p-element').click();
        //primer fila, columna nombre
        cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(3)')
        .contains(this.variable.identificadorValido)
        .should("be.visible");
    })
    it("Crear Area operativa (Direccion) invalida por exceso de caracteres",function(){
        //módulo operativo
        cy.get('.p-element.ng-tns-c21-44').click();
        //módulo área operativa
        cy.get('.ng-tns-c21-50.ng-tns-c21-44 > .p-element').click()
        //boton guardar
        cy.get('.p-button-success').click()
        //identificador
        cy.get('form.ng-untouched > :nth-child(1) > .p-inputtext').type(this.variable.identificadorInvalido)
        //cliente
        cy.get(':nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click()
        //seleccionar primer cliente "Mattel"
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //tipo
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click()
        //seleccionar primera opción "Dirección"
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //calle
        cy.get(':nth-child(4) > :nth-child(1) > .p-inputtext')
        .type(this.variable.calleInvalido)
        //numero interno
        cy.get(':nth-child(2) > .p-inputtext')
        .type(this.variable.numeroInternoInvalido)
        //numero externo
        cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        .type(this.variable.numeroExternoInvalido)
        //colonia
        cy.get(':nth-child(4) > .p-inputtext')
        .type(this.variable.coloniaInvalido)
        //municipio
        cy.get(':nth-child(5) > .p-inputtext')
        .type(this.variable.municipioInvalido)
        //estado
        cy.get(':nth-child(6) > .p-inputtext')
        .type(this.variable.estadoInvalido)
        //codigo Postal
        cy.get(':nth-child(7) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        .type(this.variable.codigoPostalInvalido)
        //cruce 1
        cy.get(':nth-child(8) > .p-inputtext')
        .type(this.variable.cruce1Invalido)
        //cruce 2
        cy.get(':nth-child(9) > .p-inputtext')
        .type(this.variable.cruce2Invalido)
        cy.wait(sleepLargo)
        //boton guardar
        cy.get('.p-button-primary').click()
        cy.wait(sleepLargo)
        cy.url().should("eq","http://localhost:4200/#/operationalAreas/add")
    })
    it("Crear Area operativa (Sucursal) invalida por exceso de caracteres",function(){
        //módulo operativo
        cy.get('.p-element.ng-tns-c21-44').click();
        //módulo área operativa
        cy.get('.ng-tns-c21-50.ng-tns-c21-44 > .p-element').click()
        //boton guardar
        cy.get('.p-button-success').click()
        //identificador
        cy.get('form.ng-untouched > :nth-child(1) > .p-inputtext').type(this.variable.identificadorInvalido)
        //cliente
        cy.get(':nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click()
        //seleccionar primer cliente "Mattel"
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //tipo
        cy.get(':nth-child(3) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click()
        //seleccionar primera opción "Dirección"
        cy.get('.p-dropdown-filter')
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{downarrow}")
        .wait(200)
        .type("{enter}")
        //calle
        cy.get(':nth-child(4) > :nth-child(1) > .p-inputtext')
        .type(this.variable.calleInvalido)
        //numero interno
        cy.get(':nth-child(4) > :nth-child(2) > .p-inputtext')
        .type(this.variable.numeroInternoInvalido)
        //numero externo
        cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        .type(this.variable.numeroExternoInvalido)
        //colonia
        cy.get(':nth-child(4) > .p-inputtext')
        .type(this.variable.coloniaInvalido)
        //municipio
        cy.get(':nth-child(5) > .p-inputtext')
        .type(this.variable.municipioInvalido)
        //estado
        cy.get(':nth-child(6) > .p-inputtext')
        .type(this.variable.estadoInvalido)
        //codigo Postal
        cy.get(':nth-child(7) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        .type(this.variable.codigoPostalInvalido)
        //cruce 1
        cy.get(':nth-child(8) > .p-inputtext')
        .type(this.variable.cruce1Invalido)
        //cruce 2
        cy.get(':nth-child(9) > .p-inputtext')
        .type(this.variable.cruce2Invalido)
        //telefono de sucursal
        cy.get(':nth-child(5) > :nth-child(1) > .p-inputtext')
        .type(this.variable.telefonoSucursalInvalido)
        //persona responsable
        cy.get(':nth-child(5) > :nth-child(2) > .p-inputtext')
        .type(this.variable.personaResponsableInvalido)
        cy.wait(sleepLargo)
        //boton guardar
        cy.get('.p-button-primary').click()
        cy.wait(sleepLargo)
        cy.url().should("eq","http://localhost:4200/#/operationalAreas/add")
    })
    it("Crear Area operativa (Cuadrante) invalida por exceso de caracteres",function(){
        //módulo operativo
        cy.get('.p-element.ng-tns-c21-44').click();
        //módulo área operativa
        cy.get('.ng-tns-c21-50.ng-tns-c21-44 > .p-element').click()
        //boton guardar
        cy.get('.p-button-success').click()
        //identificador
        cy.get('form.ng-untouched > :nth-child(1) > .p-inputtext').type(this.variable.identificadorInvalido)
        cy.wait(sleepLargo)
        //boton guardar
        cy.get('.p-button-primary').click()
        cy.wait(sleepLargo)
        cy.url().should("eq","http://localhost:4200/#/operationalAreas/add")
    })
    it("Crear Area operativa invalida por campos vacíos",function(){
        //módulo operativo
        cy.get('.p-element.ng-tns-c21-44').click();
        //módulo área operativa
        cy.get('.ng-tns-c21-50.ng-tns-c21-44 > .p-element').click()
        //boton guardar
        cy.get('.p-button-success').click()
        //identificador
        cy.get('form.ng-untouched > :nth-child(1) > .p-inputtext').type(this.variable.identificadorInvalido)
        cy.wait(sleepLargo)
        //boton guardar
        cy.get('.p-button-primary').click()
        cy.wait(sleepLargo)
        cy.url().should("eq","http://localhost:4200/#/operationalAreas/add")
    })
})