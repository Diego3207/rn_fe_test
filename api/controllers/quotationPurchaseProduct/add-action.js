
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Lote',
	description: 'Create detail of quotation purchase',
  inputs: 
	{
    
    quotationPurchaseProductQuotationPurchaseId: { 
      type:'ref',
      required : true
    },
    quotationPurchaseProductProductId: {  
      type:'ref',
      required: true
    },
    quotationPurchaseProductUnit: { 
      type: 'string',
      required: true,
      
    },
    quotationPurchaseProductQuantity: {
      type: 'ref', 
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
          
          //console.log(inputs);
          
          var create =  await QuotationPurchaseProduct.create(inputs).fetch();
         
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