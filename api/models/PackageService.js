module.exports = {

    
  tableName: 'package_services',
  attributes: 
  { 
    id: { // package_service_id int NOT NULL
      type: 'string', 
      columnName: 'package_service_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    packageServicePackageId: {  //package_service_package_id  INT  NOT NULL
      columnName: 'package_service_package_id',
      model:'package',
    },
    packageServiceServiceId: {  // package_service_service_id  INT  NOT NULL
      columnName: 'package_service_product_id',
      model:'service',
    },  
    packageServiceQuantity: {  // package_service_quantity  INT  NOT NULL
      type: 'ref',
      columnName: 'package_service_quantity',
      columnType: 'integer',
     
    },  
    packageServiceActive : { // package_service_active  inyint(1)   NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'package_service_active', 
    },  
     
  },
}; 