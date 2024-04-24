module.exports = {

    //Types in model sails -> string / number / boolean / json / ref

  tableName: 'quotation_purchases',
  attributes: 
  { 
    id: { // quotation_purchase_id int NOT NULL
      type: 'string', 
      columnName: 'quotation_purchase_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    quotationPurchaseDescription: {  
      columnName: 'quotation_purchase_description', 
      type: 'string',
      required: true,
      columnType: 'varchar(255)',
      maxLength: 255,
      isNotEmptyString:true
    },
    quotationPurchaseProviderId: {  // quotation_purchase_provider_id INT  NULL
      columnName: 'quotation_purchase_provider_id',
      model:'provider',
    },
    quotationPurchaseTimeDelivery: { // quotation_purchase_time_delivery  DATE  NOT NULL
      type: 'ref',
      required: false,//estaba en true pero , da error si no la mando en el add
      columnType: 'DATE', 
      defaultsTo:null,
      columnName: 'quotation_purchase_time_delivery', 
    },
    quotationPurchaseGuaranty: { // quotation_purchase_guaranty  TINYINT(1)  NOT NULL
      type: 'boolean',
      required: false, //estaba en true pero , da error si no la mando en el add
      columnType: 'boolean', 
      allowNull: true,
      columnName: 'quotation_purchase_guaranty', 
    },
    quotationPurchaseStatus: { // quotation_purchase_status ENUM(nueva,aceptada,rechazada)
      type:'string',
      required: true,
      isIn: ["nueva","aceptada","rechazada"],
      columnType: 'ENUM("nueva","aceptada","rechazada")',
      columnName: 'quotation_purchase_status', 
    },
    quotationPurchaseDateStatus: {// quotation_purchase_date_status DATETIME    NOT NULL
      type: 'ref',
      required: false,//estaba en true pero , da error si no la mando en el add
      columnType: 'DATETIME', 
      defaultsTo:null,
      columnName: 'quotation_purchase_date_status',
    },
    quotationPurchaseReasonStatus:{ //quotation_purchase_reason_status TEXT NOT NULL
      type:'ref',
      required: false,
      columnType:'text',
      columnName:'quotation_purchase_reason_status'
    },
    
    quotationPurchaseActive: { // quotation_purchase_active  tinyint(1)  NOT NULL
      type: 'boolean',
      defaultsTo : true,
      columnType: 'boolean', 
      columnName: 'quotation_purchase_active', 
      
    },
    quotationPurchaseProducts: {
      collection: 'quotationPurchaseProduct', //identifica la clase a la que pertenece cuando es mutiple
	    via: 'quotationPurchaseProductQuotationPurchaseId' //identifica la propidad que lo enlaza, esta propiedad no existe como tal en la base	  
    },
    quotationPurchaseServices: {
      collection: 'quotationPurchaseService', //identifica la clase a la que pertenece cuando es mutiple
	    via: 'quotationPurchaseServiceQuotationPurchaseId' //identifica la propidad que lo enlaza, esta propiedad no existe como tal en la base	  
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