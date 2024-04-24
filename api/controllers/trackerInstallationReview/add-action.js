module.exports = {
  friendlyName: 'Add',
	description: 'Add review for installation.',
  inputs: 
	{
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
        required:true
    
    },
    trackerInstallationReviewDate :  
    { 
        type: 'ref',
        required: true,
    },
    trackerInstallationReviewObservation: 
    { 
        type:'string',
        required: false,
         
    },
    trackerInstallationReviewRegisteredUserId :  
    { 
      type: 'ref',
      required: true,
    },

  },
	exits: 
 {
  success: 
    {
      statusCode: 201,
      description: 'Registro creado correctamente',
    },
  error: 
    {
      statusCode: 500,
      description: 'Error general',
    },
 },
  fn: async function (inputs, exits) 
	{
   
        try {
          var create =  await TrackerInstallationReview.create(inputs).fetch();
          return exits.success
          ({
              message: 'Registrado correctamente',
              newId: create.id
          });  
     
        }
        catch(error){
            return exits.error
            ({
                message: `Error `,
                error: error.message,
            });
        }
    }
}