
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update product File',
    
  inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },
    productFileProductId: { 
      required: true,
      type:'number',
    },
    productFileDocumentation: { 
      required: true,
      type: 'string',
    },
    productAsset: { 
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
        
      var update =  await ProductFile.update
        ({
            id: inputs.id
        }).set(_.omit(inputs, ['id']));
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