
module.exports = {
    
  friendlyName: 'Disable',
	description: 'Disable TicketMonitoringDevice',
    
    
    
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
      statusCode: 500,
      description: 'Error general',
    },
  },
    fn: async function (inputs, exits) 
	{
    
      try {
        var disable =  await TicketMonitoringDevice.update({
          id: inputs.id
        }).set({
          ticketMonitoringDeviceActive: false
        });
        return exits.success
          ({           
            message: `Se mando a papelera`,
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