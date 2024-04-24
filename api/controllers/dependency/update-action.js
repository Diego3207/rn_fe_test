
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update dependency',
    
  inputs: 
	{  
    id: {  
      type: 'number',
      required: true,
    }, 
    dependencyDescription:{
      type: 'string',
      required: true, 
    },
    dependencyDependencyCategoryId:
    {
      type: 'ref',
      required: true,
    },
    dependencyAddress: 
    {
      type: 'string',
      required: true, 
    
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
        
    var update =  await Dependency.update({
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