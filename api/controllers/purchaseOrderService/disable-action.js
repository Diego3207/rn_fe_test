

module.exports = {
    
  friendlyName: 'Disable',
	description: 'Disable service of purchase order',
    
    
    
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
        
        console.log(inputs.id);

        var disable =  await PurchaseOrderService.update({
            id: inputs.id
        }).set({
          purchaseOrderServiceActive: false
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