﻿
module.exports = {
    
  friendlyName: 'Disable',
	description: 'Disable PayMethod',
    
    
    
  inputs: 
	{   
    id: {  // PayMethod_id varchar(250)  NOT  NULL
      type: 'number',
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
        
    },
    fn: async function (inputs, exits) 
	{
    
      try {
        
    
        var disable =  await PayMethod.update({
            id: inputs.id
        }).set({
          payMethodActive: false
        });
        return exits.success
          ({           
            message: `Se mandó a papelera`,
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