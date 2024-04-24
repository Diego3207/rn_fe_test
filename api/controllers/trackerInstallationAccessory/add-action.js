module.exports = {
  friendlyName: 'Add',
	description: 'Add trackerInstallationAccessory.',
  inputs: 
	{
    trackerInstallationAccessoryTrackerInstallationId: { 
      type : 'ref',
      required: true
    },
    trackerInstallationAccessoryProductId: {  
      type : 'ref',
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
          var createTrackerInstallationAccessory =  await TrackerInstallationAccessory.create(inputs).fetch();
          return exits.success
          ({
              message: 'Registrado correctamente',
              newId: createTrackerInstallationAccessory.id
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