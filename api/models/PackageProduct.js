module.exports = {

    
  tableName: 'package_products',
  attributes: 
  { 
    id: { // package_product_id int NOT NULL
      type: 'string', 
      columnName: 'package_product_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    packageProductPackageId: {  //package_product_package_id  INT  NOT NULL
      columnName: 'package_product_package_id',
      model:'package',
    },
    packageProductProductId: {  // package_product_product_id  INT  NOT NULL
      columnName: 'package_product_product_id',
      model:'product',
    },    
    packageProductQuantity: {  // package_product_quantity  INT  NOT NULL
      type: 'number',
      columnName: 'package_product_quantity',
      columnType: 'integer',
    

     
    },
    packageProductActive : { // package_product_active  inyint(1)   NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'package_product_active', 
    },  
     
  },
}; 