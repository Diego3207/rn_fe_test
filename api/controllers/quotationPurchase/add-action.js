
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Lote',
	description: 'Create quotation of purchase',
  inputs: 
	{
    
    quotationPurchaseProviderId: {  
      type: 'string',//debe ser sttring/ref ya que asi esta en el modelo y el atributo hace referencia al modelo
      required:true,
    },

    quotationPurchaseDescription:{
      type: 'ref',
      required:true,
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

          inputs['quotationPurchaseStatus'] = 'nueva';    
          inputs['quotationPurchaseDateStatus'] = new Date();    
          
          var create =  await QuotationPurchase.create(inputs).fetch();
         
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