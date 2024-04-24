module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add product',
    inputs: 
      {
      productBrand: {  
          type: 'string',
          required: true,
      },
      productModel: { 
          required: true,
          type: 'string',
      },
      productCategoryId: {  
        type: 'ref',
        required: true,
      }, 
      productDescription: { 
        type: 'string',
        required: true,
      },
      productPrice: {
        type: 'ref',
        required: true, 
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
  
      success: 
          {
            statusCode: 201,
            description: 'Producto creado correctamente',
          },
          error: 
          {
            description: 'Error al crear producto',
          },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            var createProduct =  await Product.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createProduct.id
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