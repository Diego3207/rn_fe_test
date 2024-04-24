
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update Evidence of the installation',

    inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },
    trackerUninstallEvidenceTrackerUninstallId: 
    {
        type:'ref',
        required:true
    
    },
    trackerUninstallEvidenceEvidenceInstallationId  : 
    {
        type:'ref',
        required:true
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
        var update =  await TrackerUninstallEvidence.update({
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