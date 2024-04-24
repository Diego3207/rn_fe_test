
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update Evidence of the installation',

    inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },
    trackerInstallationEvidenceTrackerInstallationId: {  
      type:'ref',
      required:false
    },
    trackerInstallationEvidenceEvidenceInstallationId : { 
      type:'ref',
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
        var update =  await TrackerInstallationEvidence.update({
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