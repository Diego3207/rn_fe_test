
module.exports = {
    
    friendlyName: 'Delete',
      description: 'Delete Permanent SimCard',

    inputs: 
      {   
      id: {  
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
			const eliminado = await SimCard.destroyOne({
				id: inputs.id
			});
      
			return exits.success
            ({           
              message: `Eliminado permanente`,
            }); 
		
		} catch(error){
        return exits.error
          ({
            error: error.message,
          });
        }
      }
  }