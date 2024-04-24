
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update branch',
    
	inputs: 
	{   
		id: 
		{ 
			type: 'number',
			required: true,
		},
		branchName: 
		{
			type: 'string',
		}
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
    
		try 
		{
     
			var update =  await Branch.update({
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