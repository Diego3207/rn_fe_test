
module.exports = {
    friendlyName: 'Add',
      description: 'Add  device',
    inputs: 
      {
        incidenceInvolvedDeviceIncidenceBackDeviceId : 
        {
           type:'ref',
           required: true
        },
        incidenceInvolvedDeviceIncidenceId: 
        {
          type:'ref',
          required: true
        },
        incidenceInvolvedDeviceFailed:  
        { 
            type: 'boolean',
            required:false

        },
        

        
    },
      exits:
      { 
        success: 
        {
          statusCode: 201,
          description: 'Registro creado correctamente',
        },
        error: 
        {
          statusCode: 500,
          description: 'Error al crear registro',
        },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            var create =  await IncidenceInvolvedDevice.create(inputs).fetch();

            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: create.id
            });  
       
          }
          catch(error){

              return exits.error
              ({
                  message: `Error `,
                  error: error.message,
              });
          }
      }
  }