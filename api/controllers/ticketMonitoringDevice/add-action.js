module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add TicketMonitoringDevice.',
    inputs: 
      {      
      ticketMonitoringdeviceMonitoringDeviceId: { 
        type:'ref',
        required: true
      },

      ticketMonitoringdeviceTicketId: { 
        type:'ref',
        required: true
      }
    },
      exits:
      { 
        success: 
        {
          statusCode: 201,
          description: 'Dispositivo registrado correctamente',
        },
        error: 
        {
          statusCode: 500,
          description: 'Error al registrar Dispositivo',
        },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            var createTicketMonitoringDevice =  await TicketMonitoringDevice.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createTicketMonitoringDevice.id
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