module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add payMethod',
    inputs: 
      {
        payMethodKey: {  
          type: 'string',
          required: true,
        },
        payMethodValue: {  
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
            var createpayMethod =  await PayMethod.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createpayMethod.id
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