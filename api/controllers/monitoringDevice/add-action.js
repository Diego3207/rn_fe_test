module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add MonitoringDevice.',
    inputs: 
      {      
      monitoringDeviceName: {  
        type: 'string',
        required: true,
      },
      monitoringDeviceCostumerId: { 
        type:'ref',
        required: true
      },
      monitoringDeviceType: { 
        type: 'string',
        required: true,
      },
      monitoringDeviceProvider: { 
        required: true,
        type: 'boolean',
      }
    },
      exits:
      { 
        success: 
        {
          statusCode: 201,
          description: 'Dispositivo creado correctamente',
        },
        keyAlreadyExists: 
        {
          statusCode: 400,
          description: 'El Dispositivo ya existe.',
        },
        error: 
        {
          statusCode: 500,
          description: 'Error al crear Dispositivo',
        },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            var createMonitoringDevice =  await MonitoringDevice.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createMonitoringDevice.id
            });  
       
          }
          catch(error){
              if (error.code === 'E_UNIQUE') 
                {
                  return exits.keyAlreadyExists
                  ({
                  message: 'Ocurrió un error.',
                  error: 'El dispositivo ya existe.',
                  });
                }

              return exits.error
              ({
                  message: `Error `,
                  error: error.message,
              });
          }
      }
  }