module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add product file',
    inputs: 
      {
      productFileProductId: { 
        required: true,
        type:'ref',
      },
      productFileName: { 
        required: true,
        type: 'string',
      },
      productFileSize: { 
        required: true,
        type: 'ref',
      },
      productFileDocumentation: { 
        required: true,
        type: 'string',
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
            description: 'Documento subido correctamente',
          },
          error: 
          {
            description: 'Error al subir archivo',
          },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            var createProductFile =  await ProductFile.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createProductFile.id
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