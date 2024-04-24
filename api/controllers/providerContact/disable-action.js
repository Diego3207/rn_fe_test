
module.exports = {
    
  friendlyName: 'Disable',
	description: 'Disable provider contact',
    
    
    
  inputs: 
	{   
    id: {  // provider_contact_id varchar(250)  NOT  NULL
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
        
    
        var disable =  await ProviderContact.update({
            id: inputs.id
        }).set({
          providerContactActive: false
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