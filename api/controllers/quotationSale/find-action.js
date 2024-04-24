
module.exports = {
    
  friendlyName: 'Find',
description: 'Find quotation of sale',
 
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

        var find =  await QuotationSale.findOne(inputs)
        .populate('quotationSaleProducts', {
          where: {
            quotationSaleProductActive: true
          }
        })
        .populate('quotationSaleServices',{
          where: {
            quotationSaleServiceActive: true
          }
        }).populate('quotationSalePackages',{
          where: {            
            quotationSalePackageActive: true
          }
        }).populate('quotationSaleTemplates',{
          where: {            
            quotationSaleTemplateActive: true
          }
        });
      
        for(let i = 0 ; i < find['quotationSalePackages'].length; i++)
		    {
          var row = find['quotationSalePackages'][i]; 


          find['quotationSalePackages'][i].quotationSalePackageProducts = await PackageProduct.find({ packageProductPackageId: row.quotationSalePackagePackageId,  packageProductActive: true });


        }

        
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