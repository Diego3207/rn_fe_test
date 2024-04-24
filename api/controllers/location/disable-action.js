
module.exports = {
    
  friendlyName: 'Disable',
	description: 'Disable location',
    
    
    
  inputs: 
	{   
    id: {  // product_id varchar(250)  NOT  NULL
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
        var disable =  await Location.update({
          id: inputs.id
        }).set({
          locationActive: false
        });
        return exits.success
          ({           
            message: `Se mando a papelera`,
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