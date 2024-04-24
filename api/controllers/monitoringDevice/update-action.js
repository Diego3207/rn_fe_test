module.exports = {
    
    friendlyName: 'Edit',
	description: 'Edit MonitoringDevice',
    
    inputs: 
    {   
        id: {  
          type: 'number',
          required: true,
        },
        monitoringDeviceName: {  
          type: 'string',
          required: false,
        },
        monitoringDeviceCostumerId: { 
          type:'ref',
          required: false
        },
        monitoringDeviceType: { 
          type: 'string',
          required: false,
        },
        monitoringDeviceProvider: { 
          required: false,
          type: 'boolean',
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
          description: 'Sin regitros',
        },
        errorRangoPage: 
        {
            statusCode: 302,
            description: 'Valor exceden el rango permitido ',
        }
    },
    fn: async function (inputs, exits) 
	{
     //sails.log('Aqui ando');
      try {
        
        var data = {};
        for (let key in inputs) {         
          if(key != 'id'){
            data[key] = inputs[key];
          }  
        }
        
        var update =  await MonitoringDevice.update({
              id: inputs.id
          }).set(
            data
          );
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