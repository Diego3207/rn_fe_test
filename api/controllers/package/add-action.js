
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Lote',
	description: 'Create package',
  inputs: 
	{
    
    packageName: {  // package_name  varchar(255)  NOT  NULL
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
      description: 'Error general',
    },
},
fn: async function (inputs, exits) 
	{
   
        try {
          var data = {};
          
          var create =  await Package.create(inputs).fetch();
         
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