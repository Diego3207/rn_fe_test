
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Lote',
	description: 'Create service of purchase order',
  inputs: 
	{
    purchaseOrderServicePurchaseOrderId: { 
      type: 'ref', 
      required: true,
    },
  
    purchaseOrderServiceServiceId: {  
      type: 'ref', 
      required: true,
    
    },
  
    purchaseOrderServiceUnit: { 
      type: 'string', 
      required: true,
    },
  
    purchaseOrderServiceQuantity: { 
      type: 'number', 
      required: true,
    },
    
    purchaseOrderServicePrice: { 
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
          var data = {};

         
          var create =  await PurchaseOrderService.create(inputs).fetch();
         
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