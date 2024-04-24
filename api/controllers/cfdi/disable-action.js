
module.exports = {
    
  friendlyName: 'Disable',
	description: 'Disable Cfdi',
    
    
    
  inputs: 
	{   
    id: {  // Cfdi_id varchar(250)  NOT  NULL
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
        
    
        var disable =  await Cfdi.update({
            id: inputs.id
        }).set({
          cfdiActive: false
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