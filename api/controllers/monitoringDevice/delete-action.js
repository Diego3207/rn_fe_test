
module.exports = {
    
    friendlyName: 'Delete',
      description: 'Delete MonitoringDevice',
      
      
      
    inputs: 
      {   
      id: {  // MonitoringDevice_id varchar(250)  NOT  NULL
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
          
      
          var update =  await MonitoringDevice.update({
              id: inputs.id
          }).set({
            monitoringDeviceActive: false
          });
          return exits.success
            ({           
              message: `Eliminado`,
            }); 
         
        }
        catch(error){
              return exits.error
              ({
                  //message: `Error logging in user ${inputs.email}`,
                  error: error.message,
              });
          }
      }
  }