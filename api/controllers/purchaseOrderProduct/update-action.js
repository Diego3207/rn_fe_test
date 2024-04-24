module.exports = {
    
    friendlyName: 'Update',
	description: 'Update purcharse order of productos',

    inputs: 
    { 
      
      id: { 
        type: 'number', 
        required: true,
      },
      purchaseOrderProductPurchaseOrderId: { 
        type: 'ref', 
        required: false,
      },
    
      purchaseOrderProductProductId: {  
        type: 'ref', 
        required:false,
      
      },
    
      purchaseOrderProductUnit: { 
        type: 'string', 
        required: false,
      },
    
      purchaseOrderProductQuantity: { 
        type: 'number', 
        required: false,
      },
      
      purchaseOrderProductPrice: { 
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
     }
    },
    fn: async function (inputs, exits) 
	{
    
      try {
        
        var update =  await PurchaseOrderProduct.update({
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
                //message: `Error logging in user ${inputs.email}`,
                error: error.message,
            });
        }
    }
}