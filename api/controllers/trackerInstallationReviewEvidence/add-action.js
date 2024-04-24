
module.exports = {
    
  friendlyName: 'Add',
description: 'Add evidence of tracker installation',

  inputs: 
{   

  trackerInstallationReviewEvidenceTrackerInstallationReviewId: {  
    type:'ref',
    required:true
  },
  trackerInstallationReviewEvidenceEvidenceInstallationId : {  // tracker_installation_review_evidence_evidence_installation_id  INT  NULL
    type:'ref',
    required:true
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
   //sails.log('Aqui ando');
    try {
      
      
      var create =  await TrackerInstallationReviewEvidence.create(inputs).fetch();

         
          return exits.success
          ({
              message: 'Registrado correctamente',
              newId: create.id
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