module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add costumer',
    inputs: 
      {
      costumerDataBankCostumerId: {  
        type: 'ref',
        required: true,
      },
      costumerDataBankDataBankId: {  
        type: 'ref',
        required: true,
      },
    },
      exits:
      { 
  
      success: 
          {
            statusCode: 201,
            description: 'Datos de banco del cliente creado correctamente',
          },
          error: 
          {
            description: 'Error al crear la cuenta del banco del cliente',
          },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            var createCostumerDataBank =  await CostumerDataBank.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createCostumerDataBank.id
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