
module.exports = {
    
    friendlyName: 'Delete',
      description: 'Delete TicketMonitoringDevice',
      
      
      
    inputs: 
      {   
      id: {  
        type: 'number',
        required: true,
      },
  
    },
      exits: 
      {
          error: 
          {
            statusCode: 300,
            description: 'Error general',
          },
          
      },
      fn: async function (inputs, exits) 
      {
      
        try {
          
      
          var update =  await TicketMonitoringDevice.update({
              id: inputs.id
          }).set({
            ticketMonitoringDeviceActive: false
          });
          return exits.success
            ({           
              message: `Eliminado`,
            }); 
         
        }
        catch(error){
              return exits.error
              ({
                  error: error.message,
              });
          }
      }
  }