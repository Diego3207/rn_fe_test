
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Lote',
	description: 'Create quotation of sale',
  inputs: 
	{
    
    quotationSaleCustomerId: {  
      type: 'ref',
      required:true,
    },
    quotationSaleDescription:{
      type: 'ref',
      required:true,
    },
    quotationSaleSalesmanId: {  
      type: 'ref',
      required:true,
    },
    quotationSaleGuaranty: { // quotation_sale_guaranty  TINYINT(1)  NOT NULL
      type: 'boolean',
      required: false,
    },
    quotationSaleDiscount: {
      type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
      required: false,
    },
    quotationSaleIsPercentageDiscount:{
      type: 'boolean',
      required: false,
    },
    quotationSaleCommercialTerms:{
       type: 'ref',
       required:true,
    },
    quotationSaleCurrency:{
      type:'string',
      required:true
    },
    quotationSaleVAT: {
      type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
      required: true,
    },
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

          inputs['quotationSaleStatus'] = 'nueva';   
          inputs['quotationSaleDateStatus'] = new Date();
          
          var create =  await QuotationSale.create(inputs).fetch();
         
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