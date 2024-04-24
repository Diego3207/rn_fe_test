module.exports = {
  friendlyName: 'Add',
	description: 'Add Installers.',
  inputs: 
	{
    installerName:
    {
      type: 'string',
      required: true,
    },
    installerAddress: 
    {
      type: 'string',
      required: true,
    },
    installerPhone: 
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
   
        try {
          var createInstaller =  await Installer.create(inputs).fetch();
          return exits.success
          ({
              message: 'Registrado correctamente',
              newId: createInstaller.id
          });  
     
        }
        catch(error){
            return exits.error
            ({
                message: `Error `,
                error: error.message,
            });
        }
    }
}