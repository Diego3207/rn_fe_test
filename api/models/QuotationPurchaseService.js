module.exports = {

    
  tableName: 'quotation_purchase_services',
  attributes: 
  { 
    id: { // quotation_pruchase_service_id int NOT NULL
      type: 'string', 
      columnName: 'quotation_purchase_service_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    quotationPurchaseServiceQuotationPurchaseId: {  //quotation_purchase_service_quotation_purchase_id  INT  NOT NULL
      columnName: 'quotation_purchase_service_quotation_purchase_id',
      model:'quotationPurchase',
    },
    quotationPurchaseServiceServiceId: {  // quotation_pruchase_service_service_id INT  NOT NULL
      model:'service',
       columnName: 'quotation_purchase_service_service_id', 
       
    },
    quotationPurchaseServiceUnit: { //quotation_purchase_service_unit  VARCHAR(55) NOT NULL
      type: 'string', //se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'varchar(55)', 
      columnName: 'quotation_purchase_service_unit', 
    },
    quotationPurchaseServiceQuantity: { //quotation_pruchase_service_quantity  INT  NOT NULL
      type: 'ref', //se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'integer', 
      columnName: 'quotation_purchase_service_quantity', 
      isNumber:true,
    },
    
    quotationPurchaseServicePrice: { // quotation_purchase_service_price  DOUBLE(9,2)  NOT NULL
      type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
      required: false,
      columnType: 'double(12,2)', 
      columnName: 'quotation_purchase_service_price', 
      max:999999999999.00,
      isNumber: true
    },    
    quotationPurchaseServiceActive : { // quotation_purchase_service_active  inyint(1)   NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'quotation_purchase_service_active', 
    },  
     
  },
}; 