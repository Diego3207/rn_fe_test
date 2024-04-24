
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update provider product',
    
  inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },
    providerProductProviderId: { 
      type: 'ref',
      required: true,
    },
    providerProductProductId: {  
      type: 'ref',
      required: false,
    },
    providerProductServiceId: {  
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
      error: 
        {
          statusCode: 500,
          description: 'Error general',
        },
    },
    fn: async function (inputs, exits) 
	{
    
    try {
       
      var update =  await ProviderProduct.update({
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