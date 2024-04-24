module.exports = {
  
  friendlyName: 'Update',
  description: 'Update userBranch.',
  
  inputs: 
  {
	id: 
	{
      type: 'number',
      required: true,
    },
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
      
      var create =  await UserBranch.update
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
        message: `Error `,
        error: error.message,
      });
    }
  } 
}