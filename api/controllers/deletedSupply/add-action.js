module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add DeletedSupply.',
    inputs: 
      {

      deletedSupplyUserId: {  
        required: true,
        type:'number',
      },

      deletedSupplyPurchaseOrderId: {  
        required: true,
        type:'number',
      },

      deletedSupplySupplyKey: {  
        type: 'string',
        required: true,
      },  

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
            inputs['deletedSupplyDate'] = new Date();

            var createDeletedSupply =  await DeletedSupply.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createDeletedSupply.id
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