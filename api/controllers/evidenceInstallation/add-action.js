
module.exports = {
    
  friendlyName: 'Add',
description: 'Add evidence of tracker installation',

  inputs: 
{   

  evidenceInstallationPath: {  
    type:'string',
    required:true
  },
  evidenceInstallationSize: {  
    type:'ref',
    required:true
  },
  evidenceInstallationName: { 
    type:'string',
    required:true
  },
  evidenceInstallationDescription: { 
    type:'string',
    required:false
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
      
      
      var create =  await EvidenceInstallation.create(inputs).fetch();

         
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