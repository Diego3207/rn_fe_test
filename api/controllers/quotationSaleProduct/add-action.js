
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Lote',
	description: 'Create detail quotation of sale',
  inputs: 
	{
    quotationSaleProductQuotationSaleId: { 
      type:'ref',
      required:true
    },
    quotationSaleProductProductId: { 
      type:'ref',
      required:true
       
    },
    
   /* quotationSaleProductUnit: { 
      type: 'string', 
      required: true,
      
    },*/
    quotationSaleProductQuantity: { 
      type: 'number', 
      required: true,
    },
    
    quotationSaleProductPrice: { 
      type: 'ref',
      required: true,
    }, 
    quotationSaleProductDiscount: {
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

          
          var create =  await QuotationSaleProduct.create(inputs).fetch();
         
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