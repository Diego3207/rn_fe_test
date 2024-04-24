module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add tracker',
    inputs: 
      {
        
        trackerSupplyId: {  // tracker_supply_id int NOT NULL
          type: 'ref', 
          required : true,
        },
        trackerImei: { // tracker_imei varchar(16) NOT NULL
          type: 'string', 
          required : true,
        },
        trackerSimCardId: { // tracker_sim_card_id  int not NULL
          type: 'ref', 
          required : false,
        },
        trackerMaximumVoltage : { // tracker_maximum_voltage double(9,2) NOT NULL
          type: 'ref', 
          required : true,
        },
        trackerMinimumVoltage : { // tracker_minimum_voltage double(9,2) NOT NULL
          type: 'ref', 
          required : true,
        },
      },
      exits:
      { 
  
      success: 
          {
            statusCode: 201,
            description: 'Producto creado correctamente',
          },
          error: 
          {
            description: 'Error al crear producto',
          },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            inputs['trackerStatus'] = "nuevo";
            var create =  await Tracker.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: create.id
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