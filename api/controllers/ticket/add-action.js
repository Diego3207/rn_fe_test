module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add Ticket.',
    inputs: 
      {      
      ticketCostumerId: { 
        type:'ref',
        required: true
      },

      ticketUserId: { 
        type: 'ref',
        required: true,
      },
      
      ticketDescription: { 
        required: true,
        type: 'string',
      },

      ticketObservation: { 
        required: false,
        type: 'string',
      } 
      
    },
      exits:
      { 
        success: 
        {
          statusCode: 201,
          description: 'Dispositivo creado correctamente',
        },
        error: 
        {
          statusCode: 500,
          description: 'Error al crear Dispositivo',
        },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            inputs['ticketStatus'] = 'nuevo';   
            inputs['ticketDate'] = new Date();

            var createTicket =  await Ticket.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createTicket.id
            });  
       
          }
          catch(error){
              return exits.error
              ({
                  message: `Error `,
                  error: error.message,
              });
          }
      }
  }