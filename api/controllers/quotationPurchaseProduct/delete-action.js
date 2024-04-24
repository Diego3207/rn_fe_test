
module.exports = {
    
    friendlyName: 'Delete',
      description: 'Delete Permanent detail of quotation purchase',

    inputs: 
      {   
      id: {  // provider_id varchar(250)  NOT  NULL
        type: 'number',
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
          
      },
      fn: async function (inputs, exits) 
      {
      
        try {
			const eliminado = await QuotationPurchaseProduct.destroyOne({
				id: inputs.id
			});
      
			return exits.success
            ({           
              message: `Eliminado permanente`,
            }); 
		
		} catch(error){
        return exits.error
          ({
            //message: `Error logging in user ${inputs.email}`,
            error: error.message,
          });
        }
      }
  }