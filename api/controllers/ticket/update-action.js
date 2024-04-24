module.exports = {
    
    friendlyName: 'Edit',
	description: 'Edit Ticket',
    
    inputs: 
    {   
        id: {  
          type: 'number',
          required: false,
        },

        ticketCostumerId: { 
          type:'ref',
          required: false
        },
  
        ticketUserId: { 
          type: 'ref',
          required: false,
        },

        ticketEndDate: {
          type: 'ref',
          required: false,
        },
  
        ticketDescription: { 
          required: false,
          type: 'string',
        },
  
        ticketObservation: { 
          required: false,
          type: 'string',
        },

        ticketFolio: { 
          type:'string',
          required: false,
        },

        ticketStatus: { 
          type:'string',
          required: false,
        },
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
        
        var update =  await Ticket.update({
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