
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Add',
	description: 'Add provider Location',
  inputs: 
	{
    providerLocationProviderId: {   
      type:'ref', //es string/ref ya que el en el modelo asi esta
      required:true
   },
    providerLocationDescription: {  
      type: 'string',
      required: true,
    },
    providerLocationAddress: {  
      type: 'string',//'ref',////se pone en ref para que pueda filtrar con el match `contains`
      required: true
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
    try {
      
      var create =  await ProviderLocation.create(inputs).fetch();
      return exits.success
      ({
        message: 'Registrado correctamente',       
        newId: create.id
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