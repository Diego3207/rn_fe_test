module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add location.',
    inputs: 
      {
      
      locationName: {  
          type: 'string',
          required: true,
      },
      locationAddress: { 
          required: true,
          type: 'string',
      },
      locationPhone: { 
        type: 'string',
        required: true,
      },
      locationLat: { 
        required: true,
        type:'number',
      },
      locationLng: { 
        required: true,
        type: 'number',
      }
    },
      exits:
      { 
        success: 
        {
          statusCode: 201,
          description: 'Ubicacion creada correctamente',
        },
        keyAlreadyExists: 
        {
          statusCode: 400,
          description: 'La ubicación ya existe.',
        },
        error: 
        {
          statusCode: 500,
          description: 'Error al crear ubicación',
        },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            var createLocation =  await Location.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createLocation.id
            });  
       
          }
          catch(error){
              if (error.code === 'E_UNIQUE') 
                {
                  return exits.keyAlreadyExists
                  ({
                  message: 'Ocurrió un error.',
                  error: 'La ubicación ya existe.',
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