module.exports = {

    //Types in model sails -> string / number / boolean / json / ref

  tableName: 'trackers',
  attributes: 
  { 
    id: {   //tracker_id int NOT NULL
      type: 'string', //number
      columnName: 'tracker_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    trackerSupplyId: {  // tracker_supply_id int NOT NULL
      columnName: 'tracker_supply_id',
      model:'supply',
    },
    trackerImei: { // tracker_imei varchar(16) NOT NULL
      type: 'string', 
      columnType: 'varchar(16)',
      columnName: 'tracker_imei',
      maxLength: 16,
      isNotEmptyString:true
    },
    trackerSimCardId: { // tracker_sim_card_id  int not NULL
      columnName: 'tracker_sim_card_id',
      model:'simCard',
    },
    trackerStatus : { // tracker_status ENUM('activo'.'nuevo','suspendido') NOT NULL
      type:'string',
      required: true,     
      isIn: ["activo","nuevo","suspendido","baja"],
      columnType: 'ENUM("activo","nuevo","suspendido","baja")',
      columnName: 'tracker_status', 
    },
    trackerMaximumVoltage : { // tracker_maximum_voltage double(9,2) NOT NULL
      type: 'ref',
      columnType: 'double(9,2)',       
      columnName: 'tracker_maximum_voltage', 
      max:9999999.00,
      isNumber: true


    },
    trackerMinimumVoltage : { // tracker_minimum_voltage double(9,2) NOT NULL
      type: 'ref',
      columnType: 'double(9,2)',      
      columnName: 'tracker_minimum_voltage', 
      max:9999999.00,
      isNumber: true
    },
    trackerIsNotFunctional:{// tracker_is_not_functional tinyint(1) NOT NULL
      type: 'boolean',
      defaultsTo : false, // poner valor false (0) por default
      columnType: 'boolean',      
      columnName: 'tracker_is_not_functional', 
    },
    trackerActive : { // tracker_active tinyint(1) NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'tracker_active', 
    },
   
  },

  /* beforeCreate: function(recordToCreate, proceed)
{
  recordToCreate['quotationDateRegister'] = new Date();
 
  return proceed();// esto es importante para que siga la operacion de crear registro
},
afterCreate: function(newRecord, proceed)
{
  console.log(newRecord);
  return proceed();
},



beforeUpdate: function(valuesToSet, proceed)
{
  console.log("beforeUpdate");
  return proceed();
},
afterUpdate: function(updatedRecord, proceed)
{
  console.log("afterUpdate");
  return proceed();
},



beforeDestroy: function(criteria, proceed)
{
  console.log("beforeDestroy");
  return proceed();
},
afterDestroy: function(destroyedRecord, proceed)
{
  console.log("afterDestroy");
  return proceed();
},
*/

};

  