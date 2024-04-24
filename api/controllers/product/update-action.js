
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update product',
    
  inputs: 
	{   
   id: {  
      type: 'number',
      required: true,
    },
    productBrand: {  
      type: 'string',
      required: false,
    },
    productModel: { 
        required: false,
        type: 'string',
    },
    productCategoryId: {  
      type: 'ref',
      required: false,
    }, 
    productDescription: { 
      type: 'string',
      required: false,
    },
    productDocumentation: { 
      type: 'string',
    },
    productPrice: {
      type: 'ref',
      required: false, 
    },
    productGuaranteeUnit: {  
      type: 'number', 
      required: false,
    },
    productGuaranteeUnitMeasure: {  
      type: 'string', 
      required: false,
    },
    productGuaranteeSpecifications: {  
      type: 'string', 
      required: false,
    },
    productAsset: { 
      type: 'string',
    }, 
 },
	exits: 
	{
      error: 
        {
          statusCode: 300,
          description: 'Error general',
        },
      errorEmpty: 
      {
        statusCode: 301,
        description: 'Campos vacios',
      },
    },
    fn: async function (inputs, exits) 
	{
    
    try {
        
    var update =  await Product.update
        ({
            id: inputs.id
        }).set(_.omit(inputs, ['id'])); 
        return exits.success
          ({           
            message: `Actualizado`,
          }); 
       
      }
      catch(error){
            return exits.error
            ({
                //message: `Error logging in user ${inputs.email}`,
                error: error.message,
            });
        }
    }
}