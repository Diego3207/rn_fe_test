module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add Cfdi',
    inputs: 
      {
      cfdiKey: {  
        type: 'string',
        required: true,
      },
      cfdiValue: {  
        type: 'string',
        required: true,
      },
    },
      exits:
      { 
  
      success: 
          {
            statusCode: 201,
            description: 'Cliente creado correctamente',
          },
          error: 
          {
            description: 'Error al crear cliente',
          },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            var createCfdi =  await Cfdi.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createCfdi.id
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