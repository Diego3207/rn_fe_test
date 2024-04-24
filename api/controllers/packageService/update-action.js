module.exports = {
    
    friendlyName: 'Update',
	description: 'Update quotation of sale',

    inputs: 
	{   
    id: { 
      type: 'number',
      required: true,
    },
    packageServicePackageId: {  
      type:'ref',
      required: true
    },
    packageServiceServiceId: { 
      type:'ref',
      required: true
    },  
    packageServiceQuantity: { 
      type:'ref',
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
        
        
        var update =  await PackageService.update({
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