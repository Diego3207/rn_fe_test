module.exports = {

  tableName: 'purchase_order_services',
  attributes: 
  { 
    id: { // purchase_order_service_id int NOT NULL
      type: 'string', 
      columnName: 'purchase_order_service_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    purchaseOrderServicePurchaseOrderId: {  //purchase_order_service_purchase_order_id  INT  NOT NULL
      columnName: 'purchase_order_service_purchase_order_id',
      model:'purchaseOrder',
    },
  
    purchaseOrderServiceServiceId: {  // purchase_order_service_service_id  INT  NOT NULL
      columnName: 'purchase_order_service_service_id',
      model:'service',
    },
  
    purchaseOrderServiceUnit: { //purchase_order_service_unit VARCHAR(55) NOT NULL
      type: 'string', //se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'varchar(55)', 
      columnName: 'purchase_order_service_unit', 
    },
  
    purchaseOrderServiceQuantity: { //purchase_order_service_quantity  INT  NOT NULL
      type: 'ref', //se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'integer', 
      columnName: 'purchase_order_service_quantity', 
      isNumber:true,
    },
    
    purchaseOrderServicePrice: { // purchase_order_service_price  DOUBLE(9,2)  NOT NULL
      type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
      required: false,
      columnType: 'double(12,2)', 
      columnName: 'purchase_order_service_price', 
      max:999999999999.00,
      isNumber: true
    },    
    purchaseOrderServiceActive : { // purchase_order_service_active  tinyint(1)  NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'purchase_order_service_active', 
    },  
     
  },
}; 
  