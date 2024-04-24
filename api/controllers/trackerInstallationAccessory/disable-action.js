
module.exports = {
    
  friendlyName: 'Disable',
	description: 'Disable TrackerInstallationAccessory',
    
    
    
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
        
    
        var disable =  await TrackerInstallationAccessory.update({
            id: inputs.id
        }).set({
          trackerInstallationAccessoryActive: false
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