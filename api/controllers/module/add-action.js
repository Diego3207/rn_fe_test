module.exports = {
  
  friendlyName: 'Add',
  description: 'Add module.',
  
	inputs: 
	{
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

		success: 
		{
			statusCode: 201,
			description: 'Registro creado correctamente',
		},
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
		  
		  var create =  await Module.create(inputs).fetch();
		  return exits.success
		  ({
			message: 'Registrado correctamente',       
			newId: create.id
		  });  
		  
		}
		catch(error)
		{
		  return exits.error
		  ({
			message: `Error `,
			error: error.message,
		  });
		}
	} 
}