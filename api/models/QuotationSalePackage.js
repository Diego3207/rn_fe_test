module.exports = {

    
  tableName: 'quotation_sale_packages',
  attributes: 
  { 
    id: { // quotation_sale_package_id int NOT NULL
      type: 'string', 
      columnName: 'quotation_sale_package_id',
      columnType: 'integer',
      autoIncrement: true,
    },
     quotationSalePackageQuotationSaleId: {  //quotation_sale_package_quotation_sale_id int not null
      columnName: 'quotation_sale_package_quotation_sale_id',
      model:'quotationSale',
    },
     quotationSalePackagePackageId: {  // quotation_sale_package_package_id int not null
      columnName: 'quotation_sale_package_package_id',
      model:'package', 
    },
     quotationSalePackageQuantity: { //quotation_sale_package_quantity  INT  NOT NULL
      type: 'ref', //se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'integer', 
      columnName: 'quotation_sale_package_quantity', 
      isNumber:true,
    },
    
     quotationSalePackagePrice: { // quotation_sale_package_price  DOUBLE(9,2)  NOT NULL
      type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'double(12,2)', 
      columnName: 'quotation_sale_package_price', 
      max:999999999999.00,
      isNumber: true
    }, 
    quotationSalePackageDiscount: {// quotation_sale_package_discount  double(3,2)  NOT NULL
      type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
        required: false,//estaba en true pero , da error si no la mando en el add
        columnType: 'double(12,2)',  // si pongo 3,2 me dice que dato fuera de rango al guardar
        columnName: 'quotation_sale_package_discount', 
        max:999999999999.00,
        isNumber: true
    },   
    quotationSalePackageIsPercentageDiscount:{
      type: 'boolean',
      columnType: 'boolean',      
      columnName: 'quotation_sale_package_IsPercentageDiscount', 
    },
     quotationSalePackageActive : { // quotation_sale_package_active  inyint(1)   NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'quotation_sale_package_active', 
    },  
  },
}; 