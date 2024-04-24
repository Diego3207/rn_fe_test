module.exports = {

    
  tableName: 'quotation_purchase_products',
  attributes: 
  { 
    id: { // quotation_pruchase_product_id int NOT NULL
      type: 'string', 
      columnName: 'quotation_purchase_product_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    quotationPurchaseProductQuotationPurchaseId: {  //quotation_purchase_product_quotation_id  INT  NOT NULL
      columnName: 'quotation_pruchase_product_quotation_purchase_id',
      model:'quotationPurchase',
    },
    quotationPurchaseProductProductId: {  // quotation_purchase_product_product_id INT  NOT NULL
      columnName: 'quotation_purchase_product_product_id',
      model:'product',
    },
    quotationPurchaseProductUnit: { //quotation_purchase_product_unit  VARCHAR(55) NOT NULL
      type: 'string', //se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'varchar(55)', 
      columnName: 'quotation_purchase_product_unit', 
    },
    quotationPurchaseProductQuantity: { //quotation_pruchase_product_quantity  INT  NOT NULL
      type: 'ref', //se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'integer', 
      columnName: 'quotation_purchase_product_quantity', 
      isNumber:true,
    },
    
    quotationPurchaseProductPrice: { // quotation_purchase_product_price  DOUBLE(9,2)  NOT NULL
      type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
      required: false,
      columnType: 'double(12,2)', 
      columnName: 'quotation_purchase_product_price', 
      max:99999999999.00,
      isNumber: true
    },    
    quotationPurchaseProductActive : { // quotation_purchase_product_active  inyint(1)   NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'quotation_purchase_product_active', 
    },  
     
  },
}; 