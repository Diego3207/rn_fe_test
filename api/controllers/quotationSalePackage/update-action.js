module.exports = {
    
    friendlyName: 'Update',
	description: 'Update quotation of sale',

    inputs: 
	{   
    id: { 
      type: 'number',
      required: true,
    },
    quotationSalePackageQuotationSaleId: { 
      type:'ref',
      required:true
    },
    quotationSalePackagePackageId: { 
      type:'ref',
      required:true
       
    },
    
    quotationSalePackageQuantity: { 
      type: 'number', 
      required: true,
    },
    
    quotationSalePackagePrice: { 
      type: 'ref',
      required: true,
    }, 
    quotationSalePackageDiscount: {
      type: 'ref',
      required: false,
    }, 
    quotationSalePackageIsPercentageDiscount:{
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
        
        console.log(inputs);
        
        var update =  await QuotationSalePackage.update({
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