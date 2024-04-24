module.exports = {
    
    friendlyName: 'Update',
	description: 'Update quotation of sale',

    inputs: 
	{   
    id: { 
      type: 'number',
      required: true,
    },
    quotationSaleServiceQuotationSaleId: { 
      type:'ref',
      required:false
    },
    quotationSaleServiceServiceId: { 
      type:'ref',
      required:false
       
    },
    
    /*quotationSaleServiceUnit: { 
      type: 'string', 
      required: false,
      
    },*/
    quotationSaleServiceQuantity: { 
      type: 'number', 
      required: false,
    },
    
    quotationSaleServicePrice: { 
      type: 'ref',
      required: false,
    }, 
    quotationSaleServiceDiscount: {
      type: 'ref',
      required: false,
    }, 
    quotationSaleServiceIsPercentageDiscount:{
      type: 'boolean',
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
      try {
        
        
        var update =  await QuotationSaleService.update({
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