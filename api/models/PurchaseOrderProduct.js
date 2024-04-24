module.exports = {

    
  tableName: 'purchase_order_products',
  attributes: 
  { 
    id: { // purchase_order_product_id int NOT NULL
      type: 'string', 
      columnName: 'purchase_order_product_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    purchaseOrderProductPurchaseOrderId: {  //purchase_order_product_purchase_order_id  INT  NOT NULL
      columnName: 'purchase_order_product_purchase_order_id',
      model:'purchaseOrder',
    },

    purchaseOrderProductProductId: {  // purchase_order_product_product_id  INT  NOT NULL
      columnName: 'purchase_order_product_product_id',
      model:'product',
    },

    purchaseOrderProductUnit: { //purchase_order_product_unit VARCHAR(55) NOT NULL
      type: 'string', //se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'varchar(55)', 
      columnName: 'purchase_order_product_unit', 
    },

    purchaseOrderProductQuantity: { //purchase_order_product_quantity  INT  NOT NULL
      type: 'ref', //se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'integer', 
      columnName: 'purchase_order_product_quantity', 
      isNumber:true,
    },
    
    purchaseOrderProductPrice: { // purchase_order_product_price  DOUBLE(9,2)  NOT NULL
      type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
      required: false,
      columnType: 'double(12,2)', 
      columnName: 'purchase_order_product_price', 
      max:999999999999.00,
      isNumber: true
    },    
    purchaseOrderProductActive : { // purchase_order_product_active  tinyint(1)  NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'purchase_order_product_active', 
    },  
     
  },
}; 