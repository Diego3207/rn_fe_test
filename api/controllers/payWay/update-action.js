
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update PayWay',
    
  inputs: 
	{   
    payWayKey: {  
      type: 'string',
      required: true,
    },
    payWayValue: {  
      type: 'string',
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
        description: 'Campos vacios',
      },
    },
    fn: async function (inputs, exits) 
	{
    
    try {
        
    var update =  await PayWay.update
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