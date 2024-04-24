
module.exports = {
    friendlyName: 'Add',
      description: 'Add  phone coordination',
    inputs: 
      {
        incidenceCoordinationIncidenceId: 
        {
           type: 'ref',
           required: true
        },incidenceCoordinationDependencyPhoneId:
        {
          type: 'ref',
          required: true
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
            var create =  await IncidenceCoordination.create(inputs).fetch();

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