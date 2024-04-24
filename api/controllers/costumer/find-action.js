
module.exports = {
    
    friendlyName: 'Find',
	description: 'Find Costumer',
    
    
    
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
        
      var find =  await Costumer.findOne(inputs)
      .populate('costumerContacts', {
        where: {
          costumerContactActive: true
        }
      })
      .populate('costumerDataBanks',{
        where: {
          costumerDataBankActive: true
        }
      });
    
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