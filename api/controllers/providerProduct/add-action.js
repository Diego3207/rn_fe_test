
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Add',
	description: 'Add provider product',
  inputs: 
	{
    providerProductProviderId: { //provider_product_provider_id int  NOT NULL
      type: 'ref',
      required: true,
    },
    providerProductProductId: {  //provider_product_product_id int  NOT NULLL
      type: 'ref',
      required: false,
    },
    providerProductGuaranteeUnit: {  
      type: 'number', 
      required: true,
    },
    providerProductGuaranteeUnitMeasure: {  
      type: 'string', 
      required: true,
    },
    providerProductGuaranteeSpecifications: {  
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
      
      var create =  await ProviderProduct.create(inputs).fetch();
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