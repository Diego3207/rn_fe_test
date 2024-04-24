﻿
module.exports = {
    
    friendlyName: 'Find',
	description: 'Find provider location',
    
    
    
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
        errorEmpty: 
        {
          statusCode: 204,
          description: 'Sin coincidencia',
        },
        
    },
    fn: async function (inputs, exits) 
	{
      try {
        
        var find =  await ProviderLocation.findOne(inputs);
      
        if (!find) {
          return exits.errorEmpty({
            message: 'Sin coincidencia',
             
          }); 
        }
        else {
          return exits.success(find); 
        }
       
      }
      catch(error){
            return exits.error
            ({
                error: error.message,
            });
        }
    }
}