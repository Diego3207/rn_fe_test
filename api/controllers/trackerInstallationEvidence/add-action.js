
module.exports = {
    
  friendlyName: 'Add',
description: 'Add evidence of tracker installation',

  inputs: 
{   


  
  trackerInstallationEvidenceTrackerInstallationId: {  
    type:'ref',
    required:true
  },
  trackerInstallationEvidenceEvidenceInstallationId: { 
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
      
      
      var create =  await TrackerInstallationEvidence.create(inputs).fetch();

         
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