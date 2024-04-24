module.exports = {
    
    friendlyName: 'Update',
	description: 'Update detail of quotation purchase',

    inputs: 
	{   
    id: { 
      type: 'number', 
      required: true,
    },
    quotationPurchaseServiceQuotationPurchaseId: {  
       type: 'ref',
       required: true,
    },
    quotationPurchaseServiceServiceId: { 
       type: 'ref',
       required: true,
       
    },
    quotationPurchaseServiceUnit: { 
      type: 'string', 
      required: false
    },
    quotationPurchaseServiceQuantity: { 
      type: 'number', 
      required: false
    },
    
    quotationPurchaseServicePrice: { 
      type: 'ref',
      required: false,
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
        
        
        var update =  await QuotationPurchaseService.update({
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