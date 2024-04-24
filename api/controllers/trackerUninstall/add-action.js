
module.exports = {
    
  friendlyName: 'Add',
description: 'Add evidence of tracker installation',

  inputs: 
{   

  trackerUninstallTrackerInstallationId: 
  {
      type: 'ref',
      required:true
  
  },
  trackerUninstallAddress: 
  {
    type: 'string',
    required:true
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
    required:true 
       
  },
  trackerUninstallRegisteredUserId :  
  { 
      type: 'string',
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
      
      
      var create =  await TrackerUninstall.create(inputs).fetch();

         
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