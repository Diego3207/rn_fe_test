module.exports = {
    
    friendlyName: 'Update',
	description: 'Update quotation of sale',

    inputs: 
	{   
    id: { 
      type: 'number',
      required: true,
    },
    
   
    quotationSaleProductQuotationSaleId: {  //quotation_sale_product_quotation_sale_id  INT  NOT NULL
      type: 'ref',
      required: false,
    },
    quotationSaleProductProductId: {  // quotation_sale_product_product_id INT  NOT NULL
      type: 'ref',
      required: false,       
    },
    /*quotationSaleProductUnit: { //quotation_sale_product_unit  VARCHAR(55) NOT NULL
      type: 'string',
      required: false, 
    },*/
    quotationSaleProductQuantity: { //quotation_pruchase_product_quantity  INT  NOT NULL
      type: 'number',
      required: false,
    },
    
    quotationSaleProductPrice: { // quotation_sale_product_price  DOUBLE(9,2)  NOT NULL
      type: 'number',
      required: false,
    }, 
    quotationSaleProductDiscount: {// quotation_sale_product_discount  double(3,2)  NOT NULL
      type: 'ref',
      required: false,
    }, 
    quotationSaleProductIsPercentageDiscount:{
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
        
        var update =  await QuotationSaleProduct.update({
              id: inputs.id
          }).set(_.omit (inputs , ['id']));
          return exits.success
            ({           
              message: `Actualizado`,
            }); 
       
      }
      catch(error){
        console.log(inputs);

            return exits.error
            ({
                //message: `Error logging in user ${inputs.email}`,
                error: error.message,
            });
        }
    }
}