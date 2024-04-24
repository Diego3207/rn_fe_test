
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update dvice',
    
  inputs: 
	{  
    id: {  
      type: 'number',
      required: true,
    }, 
    incidenceInvolvedDeviceIncidenceBackDeviceId : 
    {
      type:'ref',
      required: false
    },
    incidenceInvolvedDeviceIncidenceId:  
    {
      type:'ref',
      required: false
    },
    incidenceInvolvedDeviceFailed:  
    { 
      type: 'boolean',
      required:false
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
        
    var update =  await incidenceInvolvedDevice.update({
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