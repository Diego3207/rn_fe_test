
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update Installer',
    
    inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },

    installerName:
    {
      type: 'string',
      required: false,
    },
    installerAddress: 
    {
      type: 'string',
      required: false,
    },
    installerPhone: 
    {
      type: 'string',
      required: false,
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
        
        var update =  await Installer.update({
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