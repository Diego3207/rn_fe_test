module.exports = {
  
  friendlyName: 'Add',
  description: 'Add user.',
  
  inputs: 
  {
    userFullName: 
	{
      type: 'string',
      required: true,
    },
    userEmail: 
	{
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    userPassword: 
	{
      type: 'string',
      required: true,
      minLength: 6,
    },
	
	userEmailStatus:
	{
		type: 'string'
	},
	
	userImage:
	{
		type: 'string'
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
      
      var create =  await User.create(inputs).fetch();
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