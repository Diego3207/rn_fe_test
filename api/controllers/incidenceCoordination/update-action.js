
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update dependency',
    
  inputs: 
	{  
    id: {  
      type: 'number',
      required: true,
    }, 
    incidenceCoordinationIncidenceId: 
    {
       type: 'ref',
       required: true
    },
    incidenceCoordinationDependencyPhoneId:
    {
      type: 'ref',
      required: true
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
        
    var update =  await Incidence.update({
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