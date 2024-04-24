
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update provider',
    
  inputs: 
	{   
    id: {  // provider_id varchar(250)  NOT  NULL
      type: 'number',
      required: true,
    },
    providerName: {  // provider_name  varchar(250)  NOT  NULL
      type: 'string',
      required: false,
    },
    providerNationality: { // provider_nationality varchar(55)  NOT  NULL
       type: 'string', 
       required: false,
   },
   providerLine: { // provider_line varchar(55)  NOT  NULL
    type: 'string',

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
     
      var update =  await Provider.update({
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
                //message: `Error logging in user ${inputs.email}`,
                error: error.message,
            });
        }
    }
}