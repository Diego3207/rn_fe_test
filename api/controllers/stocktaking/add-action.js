module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add stocktaking',
    inputs: 
      {
      stocktakingProductId: {  
          required: true,
          type:'number',
      },
      stocktakingSupplyId: { 
          required: true,
          type:'number',
      },
      stocktakingLocationId: { 
          required: true,
          type:'number',
      },
      stocktakingProductQuantity: { 
        required: true,
        type: 'number',
      },
      stocktakingType: { 
        required: true,
        type: 'string',
      },
    },
      exits:
      { 
  
      success: 
          {
            statusCode: 201,
            description: 'agregado a inventario correctamente',
          },
          error: 
          {
            description: 'Error al agregar a inventario',
          },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            var createStocktaking =  await Stocktaking.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createStocktaking.id
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