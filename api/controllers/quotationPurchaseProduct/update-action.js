module.exports = {
    
    friendlyName: 'Update',
	description: 'Update detail of quotation purchase',

    inputs: 
	{   
    id: { 
      type: 'number', 
      required: true
    },
    quotationPurchaseProductQuotationPurchaseId: {  
       type: 'ref',
       required: true
    },
    quotationPurchaseProductProductId: { 
       type: 'ref',
       required: true
       
    },
    quotationPurchaseProductUnit: { 
      type: 'string', 
      required: false
    },
    quotationPurchaseProductQuantity: { 
      type: 'number', 
      required: false
    },
    quotationPurchaseProductPrice: { 
      type: 'ref',
      required: false
    } 
     
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
     //sails.log('Aqui ando');
      try {
        
        
        var update =  await QuotationPurchaseProduct.update({
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