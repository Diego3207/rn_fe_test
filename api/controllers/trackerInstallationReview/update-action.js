
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update review for installation',
    
  inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },

    trackerInstallationReviewTrackerInstallationId: 
    {
        type:'ref',
        required:true
    
    },
    trackerInstallationReviewTechnicalUserId: 
    {
      type:'ref',
      required:true
    },
    trackerInstallationReviewAddress: 
    {
        
        type: 'string',
        required:false
    
    },
    trackerInstallationReviewDate :  
    { 
        type: 'ref',
        required: false,
    },
    trackerInstallationReviewObservation: 
    { 
        type:'string',
        required: false,
         
    },
    trackerInstallationReviewRegisteredUserId :  
    { 
      type: 'ref',
      required: false,
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
        
        var update =  await TrackerInstallationReview.update({
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