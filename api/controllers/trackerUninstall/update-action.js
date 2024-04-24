
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update Evidence of the installation',

    inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },
    trackerUninstallTrackerInstallationId: 
    {
        type: 'ref',
        required:false
    
    },
    trackerUninstallAddress: 
    {
      type: 'string',
      required:false
    },
    trackerUninstallDate: 
    {
        
        type: 'ref',
        required: false,
        
    },
    trackerUninstallObservation :  
    { 
        type: 'string',
        required:false
    },
    trackerUninstallUninstallerUserId:  
    { 
      type: 'string',
      required:false 
         
    },
    trackerUninstallRegisteredUserId :  
    { 
        type: 'string',
        required:false
    },
    
  },
	exits: 
	{
    error: 
     {
        statusCode: 500,
        description: 'Error general',
     }
    },
    fn: async function (inputs, exits) 
	{ 
      try {       
        var update =  await TrackerUninstall.update({
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
                //message: `Error logging in user ${inputs.email}`,
                error: error.message,
            });
        }
    }
}