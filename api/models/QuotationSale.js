module.exports = {

  //Types in model sails -> string / number / boolean / json / ref

tableName: 'quotation_sales',
attributes: 
{ 
  createdAt: { 
    type: 'number', 
    autoCreatedAt: true, 
  },
  updatedAt: { 
    type: 'number', 
    autoUpdatedAt: true,
  },
  id: { // quotation_sale_id int NOT NULL
    type: 'string', 
    columnName: 'quotation_sale_id',
    columnType: 'integer',
    autoIncrement: true,
  },
  quotationSaleDescription: {  //quotation_sale_description varchar(255) NOT NULL
    columnName: 'quotation_sale_description', 
    type: 'string',
    required: true,
    columnType: 'varchar(255)',
    maxLength: 255,
    isNotEmptyString:true
  },
  quotationSaleCustomerId: {  // quotation_sale_customber_id INT  NULL
    columnName: 'quotation_sale_customer_id',
    model:'costumer',
  },
  quotationSaleSalesmanId: {  // quotation_sale_salesman_id  INT  NULL
    columnName: 'quotation_sale_salesman_id',
    model:'user',
  },
  
  quotationSaleGuaranty: { // quotation_sale_guaranty  TINYINT(1)  NOT NULL
    type: 'boolean',
    required: false, //estaba en true pero , da error si no la mando en el add
    columnType: 'boolean', 
    allowNull: true,
    columnName: 'quotation_sale_guaranty', 
  },
  quotationSaleStatus: { // quotation_sale_status ENUM(nueva,aceptada,rechazada)
    type:'string',
    required: true,
    isIn: ["nueva","aceptada","rechazada"],
    columnType: 'ENUM("nueva","aceptada","rechazada")',
    columnName: 'quotation_sale_status', 
  },
  quotationSaleReasonStatus:{ //quotation_sale_reason_status TEXT NOT NULL
    type:'ref',
    required: false,
    columnType:'text',
    columnName:'quotation_sale_reason_status'
  },
  quotationSaleDateStatus: {// quotation_sale_date_status DATEtime   NOT NULL
    type: 'ref',
    required: false,//estaba en true pero , da error si no la mando en el add
    columnType: 'DATETIME', 
    defaultsTo:null,
    columnName: 'quotation_sale_date_status',
  },
  quotationSaleCommercialTerms: {// quotation_sale_commercial_terms TEXT NOT NULL
    type:'ref',
    required: false,
    columnType:'text',
    columnName:'quotation_sale_commercial_terms'
  },
  quotationSaleCurrency:{//quotation_sale_currency  varchar(55)  NOT NULL
    type:'string',
    required: true,
    columnType: 'varchar(55)',
    columnName: 'quotation_sale_currency',
  },
  quotationSaleDiscount: {// quotation_sale_discount  double(3,2)  NOT NULL
    type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
      required: false, //estaba en true pero , da error si no la mando en el add
      columnType: 'double(12,2)',  // si pongo 3,2 me dice que dato fuera de rango al guardar
      columnName: 'quotation_sale_discount', 
      max:99999999999999.00,
      isNumber: true
  },
  quotationSaleIsPercentageDiscount:{
    type: 'boolean',
    columnType: 'boolean',      
    columnName: 'quotation_sale_IsPercentageDiscount', 
  },
  quotationSaleVAT: {// quotation_sale_vat  double(3,2)  NOT NULL // iva
    type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'double(3,2)', 
      columnName: 'quotation_sale_vat', 
      max:9999999.00,
      isNumber: true
  },
  quotationSaleActive: { // quotation_sale_active  tinyint(1)  NOT NULL
    type: 'boolean',
    defaultsTo : true,
    columnType: 'boolean', 
    columnName: 'quotation_sale_active', 
    
  },
  quotationSaleFolio: {
    type:'string',
    required: false,
    columnType: 'varchar(100)',
    columnName: 'quotation_sale_folio',
  },
  quotationSaleProducts: {
    collection: 'quotationSaleProduct', //identifica la clase a la que pertenece cuando es mutiple
    via: 'quotationSaleProductQuotationSaleId' //identifica la propidad que lo enlaza, esta propiedad no existe como tal en la base	  
  },
  quotationSaleServices: {
    collection: 'quotationSaleService', //identifica la clase a la que pertenece cuando es mutiple
    via: 'quotationSaleServiceQuotationSaleId' //identifica la propidad que lo enlaza, esta propiedad no existe como tal en la base	  
  },
  quotationSalePackages: {
    collection: 'quotationSalePackage', //identifica la clase a la que pertenece cuando es mutiple
    via: 'quotationSalePackageQuotationSaleId' //identifica la propidad que lo enlaza, esta propiedad no existe como tal en la base	  
  },
  quotationSaleTemplates: {
    collection: 'quotationSaleTemplate', //identifica la clase a la que pertenece cuando es mutiple
    via: 'quotationSaleTemplateQuotationSaleId' //identifica la propidad que lo enlaza, esta propiedad no existe como tal en la base	  
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