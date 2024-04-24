
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Lote',
	description: 'Create detail of quotation purchase',
  inputs: 
	{
    
    quotationPurchaseServiceQuotationPurchaseId: { 
      type:'ref',
      required : true
    },
    quotationPurchaseServiceServiceId: {  
      type:'ref',
      required: true
    },
    quotationPurchaseServiceUnit: { 
      type: 'string',
      required: true,
      
    },
    quotationPurchaseServiceQuantity: {
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
                 
          console.log(inputs);
          var create =  await QuotationPurchaseService.create(inputs).fetch();
         
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