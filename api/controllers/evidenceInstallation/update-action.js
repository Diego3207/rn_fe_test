
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update Evidence of the installation',

    inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },
    evidenceInstallationPath: {  
      type:'string',
      required:false
    },
    evidenceInstallationSize: {  
      type:'ref',
      required:false
    },
    evidenceInstallationName: { 
      type:'string',
      required:false
    },
    evidenceInstallationDescription: { 
      type:'string',
      required:false
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
        var update =  await EvidenceInstallation.update({
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