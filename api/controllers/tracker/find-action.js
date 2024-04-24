
module.exports = {
    
    friendlyName: 'Find',
	description: 'Find tracker',
    
    
    
    inputs: 
	{   
       id: { 
       
            type: 'number', //number
            required: true,
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
          description: 'Sin coincidencia',
        },
        
    },
    fn: async function (inputs, exits) 
	{
      try {
        
        var find =  await Tracker.findOne(inputs);

        if (!find) {
          return exits.errorEmpty({
            error: '301',
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