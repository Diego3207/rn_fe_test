module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add PayWay',
    inputs: 
      {
        payWayKey: {  
          type: 'string',
          required: true,
        },
        payWayValue: {  
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
            var createPayWay =  await PayWay.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createPayWay.id
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