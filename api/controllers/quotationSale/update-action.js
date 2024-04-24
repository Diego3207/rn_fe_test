module.exports = {
    
    friendlyName: 'Update',
	description: 'Update detail quotation of sale',

    inputs: 
	{   
    id: { 
      type: 'number',
      required: true,
    },
    quotationSaleDescription:{
      type: 'ref',
      required:false,
    },
    quotationSaleCustomerId: {  
      type: 'ref',
      required:false,
    },
    quotationSaleSalesmanId: {  
      type: 'ref',
      required: false,
    },
   
    quotationSaleGuaranty: { 
      type: 'boolean',
      required: false,
    },
    quotationSaleStatus: { 
      type:'string',
      required: false,
    },
    quotationSaleFolio: { 
      type:'string',
      required: false,
    },
    quotationSaleDateStatus: {
      type: 'ref',
      required: false,
    },
    quotationSaleReasonStatus:{
      type:'ref',
      required: false,
    },
    quotationSaleCommercialTerms: {
      type:'ref',
      required: false,
    },
    quotationSaleCurrency:{
      type:'string',
      required:false
    },
    quotationSaleDiscount: {
      type: 'ref',
      required: false,
    },
    quotationSaleIsPercentageDiscount:{
      type: 'boolean',
      required: false,
    },
    quotationSaleVAT: {
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
        

        var update =  await QuotationSale.update({
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