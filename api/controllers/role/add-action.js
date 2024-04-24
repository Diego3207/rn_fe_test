module.exports = {
  
  friendlyName: 'Add',
  description: 'Add role.',
  
  inputs: 
  {
    roleName: 
	{
      type: 'string',
      required: true,
    },
	
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
      
      var create =  await Role.create(inputs).fetch();
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