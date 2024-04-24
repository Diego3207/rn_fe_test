module.exports = {
  
  friendlyName: 'Add',
  description: 'Add userBranch.',
  
  inputs: 
  {
	
	userBranchUser:
	{
		type: 'string'
	},
	
	userBranchRole:
	{
		type: 'string'
	},
	
	userBranchBranch:
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
      
      var create =  await UserBranch.create(inputs).fetch();
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