
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update product',
    
  inputs: 
	{   
    id: {  
      type: 'number',
      required: false,
    },
    trackerSupplyId: {  // tracker_supply_id int NOT NULL
      type: 'ref', 
      required : false,
    },
    trackerImei: { // tracker_imei varchar(16) NOT NULL
      type: 'string', 
      required : false,
    },
    trackerSimCardId: { // tracker_sim_card_id  int not NULL
      type: 'ref', 
      required : false,
    },
    trackerMaximumVoltage : { // tracker_maximum_voltage int(11) NOT NULL
      type: 'ref', 
      required : false,
    },
    trackerMinimumVoltage : { // tracker_minimum_voltage int(11) NOT NULL
      type: 'ref', 
      required : false,
    },
    trackerStatus : { // tracker_status ENUM('activo'.'nuevo','suspendido','baja') NOT NULL
      type:'string',
      required: false,
    },
    trackerIsNotFunctional:{// tracker_is_not_functional tinyint(1) NOT NULL
      type: 'boolean', 
      required :false,
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
        
    var update =  await Tracker.update
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