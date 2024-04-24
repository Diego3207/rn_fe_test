module.exports = {
    
  friendlyName: 'Update',
	description: 'Update stocktaking',
    
  inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },
    stocktakingProductId: {  
      required: true,
      type:'number',
    },
    stocktakingSupplyId: { 
        required: true,
        type:'number',
    },
    stocktakingLocationId: { 
        required: true,
        type:'number',
    },
    stocktakingProductQuantity: { 
      required: true,
      type: 'number',
    },
    stocktakingType: { 
      required: true,
      type: 'string',
    },
  },
	exits: 
	{
      error: 
        {
          statusCode: 300,
          description: 'Error general',
        },
      errorEmpty: 
      {
        statusCode: 301,
        description: 'Campos vacios',
      },
    },
    fn: async function (inputs, exits) 
	{
    
    try {
        
      var data = {};
      for (let key in inputs) {         
        if(key != 'id'){
          data[key] = inputs[key];
        }  
      }
      
      var update =  await Stocktaking.update({
            id: inputs.id
        }).set(data);
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