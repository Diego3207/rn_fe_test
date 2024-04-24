module.exports = {
    
  friendlyName: 'Find',
  description: 'Find SaleOrder',
    inputs: 
    {   
      id: { 
        type: 'number', //number
        required: true,
      },
    },
    exits: 
    {
      error: 
      {
        statusCode: 300,
        description: 'Error general',
      },
      errorEmpty: 
      {
        statusCode: 301,
        description: 'Sin coincidencia',
      },
    },
    fn: async function (inputs, exits) 
    {
      try 
      {
        var find =  await SaleOrder.findOne(inputs)
        .populate('saleOrderSupplies')
        .populate('saleOrderQuotationSaleId');

        //traer los productos de Quotation Sale Products
        console.log(find['saleOrderQuotationSaleId'].id);
        var quotationSaleProducts = await QuotationSaleProduct.find({ quotationSaleProductQuotationSaleId: find['saleOrderQuotationSaleId'].id, quotationSaleProductActive: true }); 
        find.saleOrderProducts = quotationSaleProducts;

        if (!find) 
        {
          return exits.errorEmpty({
            message: 'Sin coincidencia',
            }); 
        }
        else {
          return exits.success(find); 
        }
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