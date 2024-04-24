
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update provider contact',
    
  inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },
    providerContactProviderId: { 
      type:'ref', 
      required:true
   },
   providerContactDescription: {  
      type: 'string',
      required: true,
    },
    providerContactPhone: { 
      type: 'string',
      required: true
    },
    providerContactEmail: {  
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
       
      var update =  await ProviderContact.update({
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