
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update costumer contact',
    
  inputs: 
	{   
    costumerContactCostumerId: {  
      type: 'ref',
      required: true,
    },
    costumerContactName: {  
      type: 'string',
      required: true,
    },
    costumerContactPhone: {  
      type: 'string',
      required: true,
    },
    costumerContactEmail: { 
      type: 'string',
      required: true,
      isEmail: true
    },
    costumerContactDepartment: {  
      type: 'string',
      required: true,
    },
 },
	exits: 
	{
      error: 
        {
          statusCode: 300,
          description: 'Error general',
        },
      errorEmpty: 
      {
        statusCode: 301,
        description: 'Campos vacios',
      },
    },
    fn: async function (inputs, exits) 
	{
    
    try {
        
    var update =  await CostumerContact.update
        ({
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