
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Add',
	description: 'Add provider services',
  inputs: 
	{
    providerServiceProviderId: {
      type: 'ref',
      required: true,
    },
    providerServiceProductId: {
      type: 'ref',
      required: false,
    },
    providerServiceServiceId: {
      type: 'ref',
      required: false,
    },
    providerServiceGuaranteeUnit: {  
      type: 'number', 
      required: true,
    },
    providerServiceGuaranteeUnitMeasure: {  
      type: 'string', 
      required: true,
    },
    providerServiceGuaranteeSpecifications: {  
      type: 'string', 
      required: false,
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
      
      var create =  await ProviderService.create(inputs).fetch();
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