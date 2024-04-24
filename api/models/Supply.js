module.exports = {

  //Types in model sails -> string / number / boolean / json / ref

tableName: 'supplies',
attributes: 
{ 
  /*createdAt: {   -> Esto se pone aqui cuando debemos filtrar por fecha de creacion o actualizacion
    type: 'number', 
    autoCreatedAt: true, 
  },
  updatedAt: { 
    type: 'number', 
    autoUpdatedAt: true,
  },*/
  id: { // supply_id int NOT NULL
    type: 'string', 
    columnName: 'supply_id',
    columnType: 'integer',
    autoIncrement: true,
  },
  supplyProductId: {  // supply_product_id int(1) NOT NULL
    columnName: 'supply_product_id', 
    model:'product',
  },
  supplyPurchaseOrderId:{ //supply_purchase_order_id int not null
    columnName: 'supply_purchase_order_id', 
    model:'purchaseOrder',
  },
  supplySaleOrderId:{ //supply_sale_order_id int not null
    columnName: 'supply_sale_order_id', 
    model:'saleOrder',
  },
  supplyKey: {  // supply_key varchar(255) NOT NULL
    columnName: 'supply_key',
    type:'string',
    required: false,
    columnType:'varchar(255)',
    unique: true,
    minLength: 1,
    maxLength: 255,
  },
  supplyLocationId: {  //supply_location_id int NOT NULL
    columnName: 'supply_location_id',
    model:'location',
  },  
  supplyStatus: { // supply_status  ENUM(disponible,vendido,pendiente)
    type:'string',
    defaultsTo: 'disponible',
    isIn: ["disponible","vendido","pendiente"],
    columnType: 'ENUM("disponible","vendido","pendiente")',
    columnName: 'supply_status', 
  },
  supplyAssignedPersonId:{ //supply_assignedPersonId INT NOT NULL
    columnType:'supply_assignedPersonId',
    model:'user',
  },
  supplyUserSuppliedId: { // supply_userSuppliedId  int NOT NULL
    columnName: 'supply_userSuppliedId', 
    model:'user',
  },
  supplyDateSupplied:{ //supply_dateSupplied DATATIME
    type: 'ref',
    required: false,//estaba en true pero , da error si no la mando en el add
    columnType: 'DATETIME', 
    defaultsTo:null,
    columnName: 'supply_dateSupplied',
 
  },
  supplyObservation:{ // supply_observation TEXT
    type:'ref',
    required: false,
    columnType:'text',
    columnName:'supply_observation'
  },
  
  supplyActive: { //supply_active  tinyint(1)   NOT NULL
    type: 'boolean',
    defaultsTo : true,
    columnType: 'boolean', 
    columnName: 'supply_active',   
  },
 
},


 /* beforeCreate: function(recordToCreate, proceed)
{
  recordToCreate['quotationDateRegister'] = new Date();
 
  return proceed();// esto es importante para que siga la operacion de crear registro
},
*/afterCreate: function(newRecord, proceed)
{
 // console.log(newRecord);
  return proceed();
},
/*


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