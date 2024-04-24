module.exports = {

    
  tableName: 'quotation_sale_products',
  attributes: 
  { 
    id: { // quotation_sale_product_id int NOT NULL
      type: 'string', 
      columnName: 'quotation_sale_product_id',
      columnType: 'integer',
      autoIncrement: true,
    },

    quotationSaleProductQuotationSaleId: {  //quotation_sale_product_quotation_sale_id  INT  NOT NULL
      columnName: 'quotation_sale_product_quotation_sale_id',
      model:'quotationSale',
    },

    quotationSaleProductProductId: {  // quotation_sale_product_product_id INT  NOT NULL
      columnName: 'quotation_sale_product_product_id',
      model:'product',
    },
    
    quotationSaleProductQuantity: { //quotation_pruchase_product_quantity  INT  NOT NULL
      type: 'ref', //se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'integer', 
      columnName: 'quotation_sale_product_quantity', 
      isNumber:true,
    },
    
    quotationSaleProductPrice: { // quotation_sale_product_price  DOUBLE(9,2)  NOT NULL
      type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
      required: false,
      columnType: 'double(12,2)', 
      columnName: 'quotation_sale_product_price', 
      max:999999999999.00,
      isNumber: true
    }, 

    quotationSaleProductDiscount: {// quotation_sale_product_discount  double(9,2)  NOT NULL
      type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
      required: false,//estaba en true pero , da error si no la mando en el add
      columnType: 'double(12,2)',  // si pongo 3,2 me dice que dato fuera de rango al guardar
      columnName: 'quotation_sale_product_discount', 
      max:99999999999.00,
      isNumber: true,
       
    },   

    quotationSaleProductIsPercentageDiscount:{
      type: 'boolean',
      columnType: 'boolean',      
      columnName: 'quotation_sale_product_IsPercentageDiscount', 
    },
    
    quotationSaleProductActive : { // quotation_sale_product_active  inyint(1)   NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'quotation_sale_product_active', 
    },  
     
  },
}; 