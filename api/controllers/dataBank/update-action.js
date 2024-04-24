
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update DataBank',
    
  inputs: 
	{   
    dataBankBeneficiaryName: {  
      type: 'string',
      required: true,
    },
    dataBankInstitutionName: {  
      type: 'string',
      required: true,
    },
    dataBankType: { 
      type: 'string',
      required: true,
    },
    dataBankNumber: {  
      type: 'string',
      required: true,
    },
    dataBankPlayer: {  
      type: 'string',
      required: true,
    }
 },
	exits: 
	{
      error: 
        {
          statusCode: 300,
          description: 'Error general',
        },
      errorEmpty: 
      {
        statusCode: 301,
        description: 'Campos vacios',
      },
    },
    fn: async function (inputs, exits) 
	{
    
    try {
        
    var update =  await DataBank.update
        ({
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