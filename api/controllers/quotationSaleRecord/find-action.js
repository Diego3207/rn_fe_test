
module.exports = {
    
    friendlyName: 'Find',
	description: 'Find QuotationSaleRecord',
    
    
    
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
        
        var find =  await QuotationSaleRecord.findOne(inputs);
      
        if (!find) {
          console.log('no');
          return exits.errorEmpty({
            error: '301',
            message: 'Sin coincidencia',
             
          }); 
        }
        else {
          console.log('ok');
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