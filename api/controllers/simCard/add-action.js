module.exports = {
  friendlyName: 'Add',
	description: 'Add SimCard.',
  inputs: 
	{
    simCardSupplyId: { 
      type: 'ref',
      required: true,
    }, 

    simCardNumber: { 
      type: 'string',
      required: true,
    },

    simCardRecoveryCode: { 
      type: 'string',
      required: false,
    }, 

    simCardTsp: { 
      type: 'string',
      required: true,
    }, 

    simCardPin: { 
      type: 'string',
      required: false,
    }, 

    simCardPuk: { 
      type: 'string',
      required: false,
    }, 

    simCardServicePlan: { 
      type: 'string',
      required: true,
    }, 
  },
	exits: 
 {
  success: 
    {
      statusCode: 201,
      description: 'Registro creado correctamente',
    },
  error: 
    {
      statusCode: 500,
      description: 'Error general',
    },
 },
  fn: async function (inputs, exits) 
	{
   
        try {

          
          inputs['simCardStatus'] = 'disponible';  
          //console.log(inputs);

          var createSimCard =  await SimCard.create(inputs).fetch();
          return exits.success
          ({
              message: 'Registrado correctamente',
              newId: createSimCard.id
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