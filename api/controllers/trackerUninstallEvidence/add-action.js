
module.exports = {
    
  friendlyName: 'Add',
description: 'Add evidence of tracker installation',

  inputs: 
{   
  trackerUninstallEvidenceTrackerUninstallId: 
  {
      type:'ref',
      required:true
  
  },
  trackerUninstallEvidenceEvidenceInstallationId : 
  {
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
      
      
      var create =  await TrackerUninstallEvidence.create(inputs).fetch();

         
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