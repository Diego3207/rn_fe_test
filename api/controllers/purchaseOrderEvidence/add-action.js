
module.exports = {
    
  friendlyName: 'Add',
description: 'Add purchase order evidence',

  inputs: 
{   
  purchaseOrderEvidencePurchaseOrderId: {  
    type:'ref',
    required:true
  },
  purchaseOrderEvidencePath: {  
    type:'string',
    required:true
    
  },
  purchaseOrderEvidenceSize: { 
    type:'ref',
    required:true
  },
  purchaseOrderEvidenceName: {  
    type:'string',
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
      
      
      var create =  await PurchaseOrderEvidence.create(inputs).fetch();

         
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