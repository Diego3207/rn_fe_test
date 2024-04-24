module.exports = {
    
    friendlyName: 'Edit',
	description: 'Edit TicketMonitoringDevice',
    
    inputs: 
    {   
        id: {  
          type: 'number',
          required: true,
        },
        ticketMonitoringdeviceMonitoringDeviceId: { 
          type:'ref',
          required: false
        },
  
        ticketMonitoringdeviceTicketId: { 
          type:'ref',
          required: false
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
        
        var update =  await TicketMonitoringDevice.update({
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
                error: error.message,
            });
        }
    }
}