
module.exports = {
    
  friendlyName: 'Disable',
	description: 'Disable evidene',
    
    
    
  inputs: 
	{   
    id: {  // provider_supply_id 
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
        
    
        var disable =  await PurchaseOrderEvidence.update({
            id: inputs.id
        }).set({
          purchaseOrderEvidenceActive: false
        });
        return exits.success
          ({           
            message: `Se mandó a papelera`,
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