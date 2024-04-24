
module.exports = {
    friendlyName: 'Add',
      description: 'Add  device',
    inputs: 
      {
        
        incidenceBackDeviceMonitoringName:{
          type: 'string', 
            required: true
        },
        incidenceBackDeviceMonitoringDeviceId : 
        {
          type:'ref',
          required: true
        },
        incidenceBackDeviceMonitoringDeviceCustomerId: 
        {
          type:'ref',
          required: true
        },
        incidenceBackDeviceMonitoringType:  
        { 
            type: 'string', 
            required: true
        },
        incidenceBackDeviceMonitoringProviderType:{
            type: 'boolean',
            required: true
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
            var create =  await IncidenceBackDevice.create(inputs).fetch();

            return exits.success
            ({
                message: 'Registrado correctamente',
                newBackDevideId: create.id
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