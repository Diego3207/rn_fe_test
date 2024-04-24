
module.exports = {
    friendlyName: 'Add',
    description: 'Add contact for phone of dependency',
    inputs: 
    {
      dependencyPhoneContactName: { 
        type: 'string',
        required: true 
      },
      
      dependencyPhoneContactJob: { 
        type: 'string',
        required: false 
      },
      dependencyPhoneContactEmail:{
        type: 'string',
        required: false 
      },
      
    },
    exits:
      { 
        success: 
        {
          statusCode: 201,
          description: 'Registro creado correctamente',
        },
        error: 
        {
          statusCode: 500,
          description: 'Error al crear registro',
        },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            var create =  await DependencyPhoneContact.create(inputs).fetch();

            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: create.id
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