//const ProviderService = require("../../models/ProviderService");

module.exports = {
    
  friendlyName: 'Update',
	description: 'Update provider service',
    
  inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },
    providerServiceProviderId: { 
      type: 'ref',
      required: true,
  
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
    error: 
    {
      statusCode: 500,
      description: 'Error general',
    },
  },
    fn: async function (inputs, exits) 
	{
    
    try {
       
      var update =  await ProviderService.update({
            id: inputs.id
      }).set(_.omit (inputs , ['id']));
      return exits.success
      ({           
        message: `Actualizado`,
      }); 
       
    }
    catch(error){
      return exits.error
      ({
        error: error.message,
      });
    }
  }
}