module.exports = {
    
  friendlyName: 'Update',
	description: 'Update TrackerInstallationAccessory',
  inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },
    trackerInstallationAccessoryTrackerInstallationId: { 
      type : 'ref',
      required: true
    },
    trackerInstallationAccessoryProductId: {  
      type : 'ref',
      required: true
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
        
        var update =  await TrackerInstallationAccessory.update({
              id: inputs.id
          }).set(_.omit (inputs , ['id']));
          return exits.success
            ({           
              message: `Actualizado`,
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