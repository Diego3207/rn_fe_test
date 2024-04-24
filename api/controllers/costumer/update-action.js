
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update costumer',
    
  inputs: 
	{  
    id: {  
      type: 'number',
      required: true,
    }, 
    costumerName: {  
      type: 'string',
      required: false,
    },
    costumerBussinessName: {  
      type: 'string',
      required: false,
    },
    costumerRfc: { 
      type: 'string',
      required: false,
    },
    costumerAddress: {  
      type: 'string',
      required: false,
    },
   /* costumerLat: { 
      required: true,
      type:'number',
    },
    costumerLng: { 
      required: true,
      type: 'number',
    }, */
    costumerWebSite: {  
      type: 'string',
      required: false,
    },
    costumerGroup: {  
      type: 'string',
      required: false,
    },
    costumerIsClient: {
      type: 'boolean',
    },
 },
	exits: 
	{
      error: 
        {
          statusCode: 500,
          description: 'Error general',
        }
     
    },
    fn: async function (inputs, exits) 
	{
    
    try {
        
    var update =  await Costumer.update({
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