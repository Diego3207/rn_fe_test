
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Add',
	description: 'Add provider Conctact',
  inputs: 
	{
    providerContactProviderId: { //  provider_ contact_provider_id int  NOT NULL
      type:'ref', //es string/ref ya que el en el modelo asi esta
      required:true
   },
    providerContactDescription: {  //provider_ contact_description  varchar(100)  NOT  NULL
      type: 'string',
      required: true,
    },
    providerContactPhone: {  //provider_contact_phone varchar(15)  NOT NULL
      type: 'string',//'ref',////se pone en ref para que pueda filtrar con el match `contains`
      required: true
    },
    providerContactEmail: {  //provider_contact_email  varchar(100)  NOT NULL
      type: 'string',
      required: true,
      isEmail: true
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
      
      var create =  await ProviderContact.create(inputs).fetch();
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