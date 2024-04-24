
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update purchase order Evidence',

    inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },
    purchaseOrderEvidencePurchaseOrderId: {  
      type:'ref',
      required:true
    },
    purchaseOrderEvidencePath: {  
      type:'string',
      required:true
      
    },
    purchaseOrderEvidenceSize: { 
      type:'ref',
      required:true
    },
    purchaseOrderEvidenceName: {  
      type:'string',
      required:true
    },
    
  },
	exits: 
	{
    error: 
     {
        statusCode: 500,
        description: 'Error general',
     }
    },
    fn: async function (inputs, exits) 
	{
      try {       
        var update =  await PurchaseOrderEvidence.update({
              id: inputs.id
            }).set(_.omit (inputs , ['id']));
          return exits.success
            ({           
              message: `Actualizado`,
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