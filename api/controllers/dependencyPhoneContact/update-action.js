
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update phone of dependency',
    
  inputs: 
	{  
    id: {  
      type: 'number',
      required: true,
    }, 
    dependencyPhoneContactName: { 
      type: 'string',
      required: false 
    },
    
    dependencyPhoneContactJob: { 
      type: 'string',
      required: false 
    },
    dependencyPhoneContactEmail:{
      type: 'string',
      required: false 
    },
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
        
    var update =  await DependencyPhoneContact.update({
            id: inputs.id
        }).set(_.omit(inputs, ['id'])); 
        return exits.success
          ({           
            message: `Actualizado`,
          }); 
       
      }
      catch(error){
            return exits.error
            ({
                //message: `Error logging in user ${inputs.email}`,
                error: error.message,
            });
        }
    }
}