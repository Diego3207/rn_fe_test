module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add costumer',
    inputs: 
      {
      costumerName: {  
        type: 'string',
        required: true,
      },
      costumerBussinessName: {  
        type: 'string',
        required: false,
      },
      costumerRfc: { 
        type: 'string',
        required: false,
      },
      costumerAddress: {  
        type: 'string',
        required: false,
      },
      /*costumerLat: { 
        required: true,
        type:'number',
      },
      costumerLng: { 
        required: true,
        type: 'number',
      }, */
      costumerWebSite: {  
        type: 'string',
        required: false,
      },
      costumerGroup: {  
        type: 'string',
        required: false,
      },
      costumerIsClient: {
        type: 'boolean',
      },
    },
      exits:
      { 
        success: 
        {
          statusCode: 201,
          description: 'Cliente creado correctamente',
        },
        keyAlreadyExists: 
        {
          statusCode: 400,
          description: 'El cliente ya existe.',
        },
        error: 
        {
          statusCode: 500,
          description: 'Error al crear cliente',
        },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            var createCostumer =  await Costumer.create(inputs).fetch();

            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createCostumer.id
            });  
       
          }
          catch(error){
              if (error.code === 'E_UNIQUE') 
              {
                return exits.keyAlreadyExists
                ({
                message: 'Ocurrió un error.',
                error: 'El cliente ya existe.',
                });
              }

              return exits.error
              ({
                  message: `Error `,
                  error: error.message,
              });
          }
      }
  }