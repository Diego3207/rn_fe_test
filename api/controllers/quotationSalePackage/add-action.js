
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Lote',
	description: 'Create detail quotation of sale',
  inputs: 
	{
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
  success: 
    {
      statusCode: 201,
      description: 'Registro creado correctamente',
    },
  error: 
    {
      statusCode: 500,
      description: 'Error general',
    },
},
fn: async function (inputs, exits) 
	{
   
        try {
          var data = {};

          
          var create =  await QuotationSalePackage.create(inputs).fetch();
         
          return exits.success
          ({
              message: 'Registrado correctamente',
              newId: create.id
          });  
    
        }
        catch(error){
            return exits.error
            ({
                message: `Error `,
                error: error.message,
            });
        }
    }
}