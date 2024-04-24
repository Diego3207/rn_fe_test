module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add costumer contact',
    inputs: 
      {
        costumerContactCostumerId: {  
          type: 'ref',
          required: true,
        },
        costumerContactName: {  
          type: 'string',
          required: true,
        },
        costumerContactPhone: {  
          type: 'string',
          required: true,
        },
        costumerContactEmail: { 
          type: 'string',
          required: true,
          isEmail: true
        },
        costumerContactDepartment: {  
          type: 'string',
          required: true,
        },
      },
      exits:
      { 
  
      success: 
          {
            statusCode: 201,
            description: 'Contacto de cliente creado correctamente',
          },
          error: 
          {
            description: 'Error al crear contacto de cliente',
          },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            var createCostumerContact =  await CostumerContact.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createCostumerContact.id
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