
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Lote',
	description: 'Create detail of package',
  inputs: 
	{
    packageServicePackageId: {  
      type:'ref',
      required: true
    },
    packageServiceServiceId: { 
      type:'ref',
      required: true
    },   
    packageServiceQuantity: { 
      type:'ref',
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
      description: 'Error general',
    },
},
fn: async function (inputs, exits) 
	{
   
        try {
          var data = {};

          
          var create =  await PackageService.create(inputs).fetch();
         
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