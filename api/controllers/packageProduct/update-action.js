module.exports = {
    
    friendlyName: 'Update',
	description: 'Update quotation of sale',

    inputs: 
	{   
    id: { 
      type: 'number',
      required: true,
    },
    packageProductPackageId: {  
      type:'ref',
      required: true
    },
    packageProductProductId: { 
      type:'ref',
      required: true
    },  
    packageProductQuantity: { 
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
        
        
        var update =  await PackageProduct.update({
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