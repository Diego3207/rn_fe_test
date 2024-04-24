
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Lote',
	description: 'Create detail quotation of sale',
  inputs: 
	{
    quotationSaleServiceQuotationSaleId: { 
      type:'ref',
      required:true
    },
    quotationSaleServiceServiceId: { 
      type:'ref',
      required:true
       
    },
    
  /*  quotationSaleServiceUnit: { 
      type: 'string', 
      required: true,
      
    },*/
    quotationSaleServiceQuantity: { 
      type: 'number', 
      required: true,
    },
    
    quotationSaleServicePrice: { 
      type: 'ref',
      required: true,
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

          
          var create =  await QuotationSaleService.create(inputs).fetch();
         
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