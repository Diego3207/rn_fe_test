
module.exports = {
    friendlyName: 'Add',
      description: 'Add phone of dependency',
    inputs: 
      {
        dependencyPhoneDependencyId: { 
          type: 'ref',
          required:true
        },
        
        dependencyPhoneDependencyPhoneContactId: {  
          type: 'ref',
          required:false
        },
        dependencyPhoneNumber : {  
          type : 'string',
          required : true
        },
        dependencyPhoneExtension:{ 
          type : 'string',
          required : false,
        },
        dependencyPhoneCommunicationChannel:{
          type : 'string',
          required : true
        }
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
            var create =  await DependencyPhone.create(inputs).fetch();

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