
module.exports = {
    
  friendlyName: 'Disable',
	description: 'Disable provider product',
    
    
    
  inputs: 
	{   
    id: {  // provider_supply_id 
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
        
    
        var disable =  await ProviderProduct.update({
            id: inputs.id
        }).set({
          providerProductActive: false
        });
        return exits.success
          ({           
            message: `Se mandó a papelera`,
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