module.exports = {
    
    friendlyName: 'Update',
	description: 'Update service of purchase order',

    inputs: 
	{   
    id: { 
      type: 'number',
      required: true,
    },
    purchaseOrderServicePurchaseOrderId: { 
      type: 'ref', 
      required: false,
    },
  
    purchaseOrderServiceServiceId: {  
      type: 'ref', 
      required: false,
    
    },
  
    purchaseOrderServiceUnit: { 
      type: 'string', 
      required: false,
    },
  
    purchaseOrderServiceQuantity: { 
      type: 'number', 
      required: false,
    },
    
    purchaseOrderServicePrice: { 
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
     },
    },
    fn: async function (inputs, exits) 
	{
      try {
        
        var update =  await PurchaseOrderService.update({
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