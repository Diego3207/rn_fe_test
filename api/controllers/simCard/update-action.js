
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update SimCard',
    
    
    
    inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },

    simCardSupplyId: { 
      type: 'ref',
      required: false,
    }, 

    simCardNumber: { 
      type: 'string',
      required: false,
    },

    simCardRecoveryCode: { 
      type: 'string',
      required: false,
    }, 

    simCardTsp: { 
      type: 'string',
      required: false,
    }, 

    simCardPin: { 
      type: 'string',
      required: false,
    }, 

    simCardPuk: { 
      type: 'string',
      required: false,
    }, 

    simCardServicePlan: { 
      type: 'string',
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
        
        var update =  await SimCard.update({
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
                error: error.message,
            });
        }
    }
}