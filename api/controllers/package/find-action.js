
module.exports = {
    
  friendlyName: 'Find',
description: 'Find package',
 
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
        statusCode: 500,
        description: 'Error general',
      },
      errorEmpty: 
      {
        statusCode: 204,
        description: 'Sin coincidencia',
      },
      
  },
  fn: async function (inputs, exits) 
{
    try {


        var find =  await Package.findOne(inputs)
        .populate('packageProducts', {
          where: {
            packageProductActive: true
          }
        })
        .populate('packageServices', {
          where: {
            packageServiceActive: true
          }
        });
        ////No uso populate ya que no trae la informacion de producto
        //var find =  await Package.findOne(inputs); 
        // find.quotationSaleProducts = await QuotationPurchaseProduct.find({ quotationSaleProductQuotationSaleId: find.id,  quotationSaleProductActive: true });
        //find.quotationSaleServices = await QuotationPurchaseService.find({ quotationSaleServiceQuotationSaleId: find.id,  quotationSaleServiceActive: true });



        
        

      

    
      if (!find) {
        //console.log('no');
        return exits.errorEmpty({
          message: 'Sin coincidencia',
           
        }); 
      }
      else {
        //console.log('ok');
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