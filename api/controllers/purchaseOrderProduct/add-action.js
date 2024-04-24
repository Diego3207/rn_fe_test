module.exports = {
    
  friendlyName: 'Add',
description: 'add purchase order of productos',

  inputs: 
{   
  
  purchaseOrderProductPurchaseOrderId: { 
    type: 'ref', 
    required: true,
  },

  purchaseOrderProductProductId: {  
    type: 'ref', 
    required: true,
  
  },

  purchaseOrderProductUnit: { 
    type: 'string', 
    required: true,
  },

  purchaseOrderProductQuantity: { 
    type: 'number', 
    required: true,
  },
  
  purchaseOrderProductPrice: { 
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
   console.log(inputs);

    try {
      
      var create =  await PurchaseOrderProduct.create(inputs).fetch();

         
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