module.exports = {
    
    friendlyName: 'Update',
	description: 'Update purcharse order of productos',

    inputs: 
    { 
      
      id: { 
        type: 'number', 
        required: true,
      },
      supplyProductId: {  
        type:'ref',
        required: false,
      },
      supplyPurchaseOrderId:{ 
        type:'ref',
        required: false,
      },
      supplySaleOrderId:{ 
        type:'ref',
        required: false,
      },
      supplyKey: {  
        type:'string',
        required: false,
      },
      supplyLocationId: {  
        type:'ref',
        required: false,
      },  
      supplyStatus: { 
        type:'string',
        required: false,    
      },
      supplyUserSuppliedId: { 
        type:'ref',
        required: false,
      },
      supplyDateSupplied:{ 
        type: 'ref',
        required: false,
      },
      supplyAssignedPersonId:{
        type: 'ref',
        required: false,
      },
      supplyObservation:{ 
        type:'ref',
        required: false,
        
      }   
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
        
        var update =  await Supply.update({
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