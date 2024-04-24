
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update TrackerInstallation',
    
  inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },

    trackerInstallationCostumerId:
    {
      type: 'ref',
      required: false,
    },
    trackerInstallationTrackerId: 
    {
      type: 'ref',
      required: false,
    },
    trackerInstallationTrackerId: 
    {
      type: 'ref',
      required: false,
    },
    trackerInstallationInstallerId: 
    {
      type: 'ref',
      required: false,
    },
    trackerInstallationDate: 
    {
      type: 'ref',
      required: false,
    },
    trackerInstallationEngineStop: 
    {
      type: 'boolean',
      required: false, 
    },
    trackerInstallationTypeCut: 
    {
      type: 'string',
      required: false,
    },
    
    trackerInstallationLocation: 
    {
      type: 'string',
      required: false,
    },
    trackerInstallationIsUninstalled:{
      type:'boolean',
      required:false
    }
  },
	exits: 
	{
        error: 
        {
          statusCode: 500,
          description: 'Error general',
        },
    },
    fn: async function (inputs, exits) 
	{
      try {
        
        var update =  await TrackerInstallation.update({
              id: inputs.id
          }).set(_.omit (inputs , ['id']));
          return exits.success
            ({           
              message: `Actualizado`,
            }); 
       
      }
      catch(error){
            return exits.error
            ({
                error: error.message,
            });
        }
    }
}