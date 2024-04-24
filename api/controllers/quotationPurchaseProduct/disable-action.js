

module.exports = {
    
  friendlyName: 'Disable',
	description: 'Disable detail of quotation purchase',
    
    
    
  inputs: 
	{   
    id: {  // quotation_id varchar(250)  NOT  NULL
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
        
        var disable =  await QuotationPurchaseProduct.update({
          id: inputs.id
        }).set({
          quotationPurchaseProductActive: false
        });
        return exits.success
          ({           
            message: `Eliminado`,
          }); 
       
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