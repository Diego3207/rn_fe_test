
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update provider location',
    
  inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },
    providerLocationProviderId: { 
      type:'ref', 
      required:true
   },
   providerLocationDescription: {  
      type: 'string',
      required: true,
    },
    providerLocationAddress: {  
      type: 'string',
      required: true
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
     
      var update =  await ProviderLocation.update({
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