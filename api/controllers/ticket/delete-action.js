
module.exports = {
    
    friendlyName: 'Delete',
      description: 'Delete Ticket',
      
      
      
    inputs: 
      {   
      id: {  
        type: 'number',
        required: true,
      },
  
    },
      exits: 
      {
          error: 
          {
            statusCode: 300,
            description: 'Error general',
          },
          
      },
      fn: async function (inputs, exits) 
      {
      
        try {
          
      
          var update =  await Ticket.update({
              id: inputs.id
          }).set({
            TicketActive: false
          });
          return exits.success
            ({           
              message: `Eliminado`,
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