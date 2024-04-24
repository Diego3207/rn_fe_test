
module.exports = {
    friendlyName: 'Add',
      description: 'Add dependency',
    inputs: 
      {
        dependencyDescription:{
          type: 'string',
          required: true, 
        },
        dependencyDependencyCategoryId:
        {
          type: 'ref',
          required: true,
        },
        dependencyAddress: 
        {
          type: 'string',
          required: true, 
        
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
            var create =  await Dependency.create(inputs).fetch();

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