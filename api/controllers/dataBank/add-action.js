module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add DataBank',
    inputs: 
      {
      dataBankBeneficiaryName: {  
        type: 'string',
        required: true,
      },
      dataBankInstitutionName: {  
        type: 'string',
        required: true,
      },
      dataBankType: { 
        type: 'string',
        required: true,
      },
      dataBankNumber: {  
        type: 'string',
        required: true,
      },
      dataBankPlayer: {  
        type: 'string',
        required: true,
      }
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
            var createDataBank =  await DataBank.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createDataBank.id
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