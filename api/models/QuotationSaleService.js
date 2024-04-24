module.exports = {

    
  tableName: 'quotation_sale_services',
  attributes: 
  { 
    id: { // quotation_sale_service_id int NOT NULL
      type: 'string', 
      columnName: 'quotation_sale_service_id',
      columnType: 'integer',
      autoIncrement: true,
    },
     quotationSaleServiceQuotationSaleId: {  //quotation_sale_service_quotation_sale_id  INT  NOT NULL
      columnName: 'quotation_sale_service_quotation_sale_id',
      model:'quotationSale',
    },
     quotationSaleServiceServiceId: {  // quotation_sale_service_service_id INT  NOT NULL
       required: true,
       columnName: 'quotation_sale_service_service_id', 
       model:'service',
    },
    /* quotationSaleServiceUnit: { //quotation_sale_service_unit  VARCHAR(55) NOT NULL
      type: 'string', //se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'varchar(55)', 
      columnName: 'quotation_sale_service_unit', 
    },*/
     quotationSaleServiceQuantity: { //quotation_pruchase_service_quantity  INT  NOT NULL
      type: 'ref', //se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'integer', 
      columnName: 'quotation_sale_service_quantity', 
      isNumber:true,
    },
    
     quotationSaleServicePrice: { // quotation_sale_service_price  DOUBLE(9,2)  NOT NULL
      type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
      required: false,
      columnType: 'double(12,2)', 
      columnName: 'quotation_sale_service_price', 
      max:999999999999.00,
      isNumber: true
    }, 
     quotationSaleServiceDiscount: {// quotation_sale_service_discount  double(3,2)  NOT NULL
      type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
        required: false,//estaba en true pero , da error si no la mando en el add
        columnType: 'double(12,2)',  // si pongo 3,2 me dice que dato fuera de rango al guardar 
        columnName: 'quotation_sale_service_discount', 
        max:999999999999.00,
        isNumber: true
    },  
    quotationSaleServiceIsPercentageDiscount:{
      type: 'boolean',
      columnType: 'boolean',      
      columnName: 'quotation_sale_service_IsPercentageDiscount', 
    }, 
     quotationSaleServiceActive : { // quotation_sale_service_active  inyint(1)   NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'quotation_sale_service_active', 
    },  
     
  },
}; 