module.exports = {
    
    friendlyName: 'Edit',
	description: 'Edit Location',
    
    inputs: 
    {   
        id: {  
            type: 'number',
            required: true,
        },
        locationName: {  
            type: 'string',
            required: true,
        },
        locationAddress: { 
            type: 'string',
            required: true,
        },
        locationPhone: { 
            type: 'string',
        },
        locationLat: { 
          required: true,
          type:'number',
        },
        locationLng: { 
          required: true,
          type: 'number',
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
        
        var update =  await Location.update({
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