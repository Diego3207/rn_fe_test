
module.exports = {
    
    friendlyName: 'Find',
	description: 'Find dependency',
    
    
    
    inputs: 
	{   
       id: { 
       
            type: 'number', //number
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
    errorEmpty: 
    {
      statusCode: 204,
      description: 'Sin coincidencia',
    },
        
    },
    fn: async function (inputs, exits) 
	{

    try {
        
      var find =  await Dependency.findOne(inputs)
      .populate('dependencyPhones',{
        where: {
          dependencyPhoneActive: true
        }
      });

      for (var i = 0; i < find['dependencyPhones'].length; i++) 
      {

        if(find['dependencyPhones'][i].dependencyPhoneDependencyPhoneContactId != null){
          var contact = await DependencyPhoneContact.findOne({ id: find['dependencyPhones'][i].dependencyPhoneDependencyPhoneContactId , dependencyPhoneContactActive: true }); 
          
          find['dependencyPhones'][i].dependencyPhoneDependencyPhoneContactId  = contact;
      
        }
      }
    
      if (!find) {
        return exits.errorEmpty({
          message: 'Sin coincidencia',
           
        }); 
      }
      else {
        return exits.success(find); 
      }
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