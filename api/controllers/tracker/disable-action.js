
module.exports = {
    
  friendlyName: 'Disable',
	description: 'Disable tracker',
    
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
        
    
        var disable =  await Tracker.update({
            id: inputs.id
        }).set({
          trackerActive: false
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