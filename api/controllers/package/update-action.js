module.exports = {
    
    friendlyName: 'Update',
	description: 'Update detail quotation of sale',

    inputs: 
	{   
    id: { 
      type: 'number',
      required: true,
    },
    packageName: {  // package_name  varchar(255)  NOT  NULL
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
        
        
        var update =  await Package.update({
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