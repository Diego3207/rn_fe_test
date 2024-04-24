
module.exports = {
    
    friendlyName: 'Delete',
      description: 'Delete phone of dependency',

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
			const eliminado = await DependencyPhone.destroyOne({
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