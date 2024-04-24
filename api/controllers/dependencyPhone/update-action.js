
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update phone of dependency',
    
  inputs: 
	{  
    id: {  
      type: 'number',
      required: true,
    }, 
    dependencyPhoneDependencyId: { 
      type: 'ref',
      required:false
    },
    dependencyPhoneDependencyPhoneContactId: {  
      type: 'ref',
      required:false
    },
    dependencyPhoneNumber : {  
      type : 'string',
      required : false
    },
    dependencyPhoneExtension:{ 
      type : 'string',
      required : false
    },
    dependencyPhoneCommunicationChannel:{
      type : 'string',
      required : false
    }
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
        //console.log(inputs);
    var update =  await DependencyPhone.update({
            id: inputs.id
        }).set(_.omit(inputs, ['id'])); 
        return exits.success
          ({           
            message: `Actualizado`,
            updateId:inputs.id
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