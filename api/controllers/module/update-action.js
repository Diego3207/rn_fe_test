
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update module',
    
	inputs: 
	{   
		id: 
		{ 
			type: 'number',
			required: true,
		},
		moduleName: 
		{
			type: 'string',
			required: true,
		},
		moduleDescription: 
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
     
			var update =  await Module.update({
				id: inputs.id
			}).set(_.omit (inputs , ['id']));
        
			return exits.success
			({           
				message: `Actualizado`,
			}); 
       
		}
		catch(error)
		{
            return exits.error
            ({
                error: error.message,
            });
        }
    }
}