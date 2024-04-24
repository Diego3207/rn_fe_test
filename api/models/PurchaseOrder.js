module.exports = {

  tableName: 'purchase_orders',
  attributes: 
  { 
    id: { // purchase_order_id int NOT NULL
      type: 'string', 
      columnName: 'purchase_order_id',
      columnType: 'integer',
      autoIncrement: true, 
    }, 
    purchaseOrderDescription: {  
      columnName: 'purchase_order_description', 
      type: 'string',
      required: true,
      columnType: 'varchar(255)',
      maxLength: 255,
      isNotEmptyString:true
    },
    purchaseOrderQuotationPurchaseId: {  //purchase_order_quotation_id  INT  NULL
      columnName: 'purchase_order_quotation_purchase_id',
      model:'quotationPurchase',
    },
    purchaseOrderProviderId: {  // purchase_order_provider_id INT  NULL
      columnName: 'purchase_order_provider_id',
      model:'provider',
    },
    purchaseOrderGuaranty: { // purchase_order_guaranty  TINYINT(1)  NOT NULL
      type: 'boolean',
      required: false,
      allowNull: true,
      columnType: 'boolean', 
      columnName: 'purchase_order_guaranty', 
    },
    purchaseOrderStatus: { // purchase_order_status ENUM("nueva","abastesida","pendiente")
      type:'string',
      /*required: true,*/
      defaultsTo: 'nueva',
      isIn: ["nueva","recibida","abastecida","pendiente"],
      columnType: 'ENUM("nueva","recibida","abastecida","pendiente")',
      columnName: 'purchase_order_status', 
    },
    purchaseOrderUserReceivedId:{ //purchase_order_userReceived INT NOT NULL
      columnName: 'purchase_order_userReceived_id',
      model:'user',

    },
    purchaseOrderDateStatus: {// purchase_order_date_status DATEtime    NOT NULL
      type: 'ref',
      required: false,//estaba en true pero , da error si no la mando en el add
      columnType: 'DATETIME', 
      defaultsTo:null,
      columnName: 'purchase_order_date_status',
    },
    purchaseOrderStatusObservation: {// purchase_order_statusObservation TEXT
      type:'ref',
      required: false,
      columnType:'text',
      columnName:'purchase_order_statusObservation'
    },
    purchaseOrderActive: { // purchase_order_active  tinyint(1)  NOT NULL
      type: 'boolean',
      defaultsTo : true,
      columnType: 'boolean', 
      columnName: 'purchase_order_active', 
    },
    purchaseOrderProducts: {
      collection: 'purchaseOrderProduct', //identifica la clase a la que pertenece cuando es mutiple
      via: 'purchaseOrderProductPurchaseOrderId' //identifica la propidad que lo enlaza, esta propiedad no existe como tal en la base	  
    },
    purchaseOrderServices: {
      collection: 'purchaseOrderService', //identifica la clase a la que pertenece cuando es mutiple
      via: 'purchaseOrderServicePurchaseOrderId' //identifica la propidad que lo enlaza, esta propiedad no existe como tal en la base	  
    },

    purchaseOrderEvidences: 
    {
      collection: 'purchaseOrderEvidence', 
      via: 'purchaseOrderEvidencePurchaseOrderId'  
    },
    
    
  },
 /* beforeCreate: function(recordToCreate, proceed)
  {
    recordToCreate['quotationDateRegister'] = new Date();
	 
	  return proceed();// esto es importante para que siga la operacion de crear registro
  },
 /* afterCreate: function(newlyCreatedRecord, proceed)
  {
	  console.log("afterCreate");
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