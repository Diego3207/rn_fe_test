

module.exports = {
    
  friendlyName: 'Disable',
	description: 'Disable deatail of package',
    
    
    
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
        
    
        var disable =  await PackageService.update({
            id: inputs.id
        }).set({
          packageServiceActive: false
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