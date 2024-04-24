
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Add',
	description: 'Add provider.',
  inputs: 
	{
    providerName: {  // provider_name  varchar(250)  NOT  NULL
      type: 'string',
      required: true,
    },
    providerNationality: { // provider_nationality varchar(55)  NOT  NULL
      type: 'string',
      required: true,
    },
    providerLine: { // provider_line varchar(55)  NOT  NULL
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
      keyAlreadyExists: 
      {
        statusCode: 400,
        description: 'El proveedor ya existe.',
      },
      error: 
      {
        statusCode: 500,
        description: 'Error general',
      },
    },
  fn: async function (inputs, exits) 
	{
    try {
      
      var create =  await Provider.create(inputs).fetch();
      return exits.success
      ({
        message: 'Registrado correctamente',       
        newId: create.id
      });  
      
    }
    catch(error){
      if (error.code === 'E_UNIQUE') 
      {
        return exits.keyAlreadyExists
        ({
        message: 'Ocurrió un error.',
        error: 'El proveedor ya existe.',
        });
      }

      return exits.error
      ({
        message: `Error `,
        error: error.message,
      });
    }
  } 
}