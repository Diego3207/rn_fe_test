
module.exports = {
    
  friendlyName: 'Disable',
	description: 'Disable Vehicle',
    
    
    
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
        
    
        var disable =  await Vehicle.update({
            id: inputs.id
        }).set({
          vehicleActive: false
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