module.exports = 
{
	friendlyName: 'Update',
	description: 'Update user.',

	inputs: 
	{
		id: 
		{
			type: 'number',
			required: true,
		},
		
		userFullName: 
		{
			type: 'string',
		},
		
		userEmail: 
		{
			type: 'string',
		},
		
		userImage:
		{
			type: 'string',
		},
		
		userEmailStatus:
		{
			type: 'string',
		},
				
		userPassword:  //password que va a actualizar
		{
			type: 'string',
		}
		
	},

	exits: 
	{
		success: 
		{
			statusCode: 201,
			description: 'New muna user created',
		},
		emailAlreadyInUse: 
		{
			statusCode: 400,
			description: 'Email address already in use',
		},
		error: 
		{
			description: 'Something went wrong',
		},
	},

	fn: async function (inputs, exits) 
	{
		try 
		{
        
			if(inputs.userPassword)
				inputs.userPassword = await sails.helpers.passwords.hashPassword( inputs.userPassword );
			
			//console.log(inputs);
	  
			var update =  await User.update
			({
				id: inputs.id
			}).set(_.omit(inputs, ['id']));
        
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
	},
};