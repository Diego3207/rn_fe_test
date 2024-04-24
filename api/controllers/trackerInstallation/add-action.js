module.exports = {
  friendlyName: 'Add',
	description: 'Add TrackerInstallation.',
  inputs: 
	{
    trackerInstallationCostumerId:
    {
      type: 'ref',
      required: true,
    },
    trackerInstallationVehicleId:
    {
      type: 'ref',
      required: true,
    },
    trackerInstallationTrackerId: 
    {
      type: 'ref',
      required: true,
    },
    trackerInstallationInstallerId: 
    {
      type: 'ref',
      required: true,
    },
    trackerInstallationDate: 
    {
      type: 'ref',
      required: true,
    },
    trackerInstallationEngineStop: 
    {
      type: 'boolean',
      required: false, 
    },
    trackerInstallationTypeCut: 
    {
      type: 'string',
      required: true,
    },
   
    trackerInstallationLocation: 
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
      description: 'Error general',
    },
 },
  fn: async function (inputs, exits) 
	{
   
        try {
          var createTrackerInstallation =  await TrackerInstallation.create(inputs).fetch();
          return exits.success
          ({
              message: 'Registrado correctamente',
              newId: createTrackerInstallation.id
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