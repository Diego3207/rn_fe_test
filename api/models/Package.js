module.exports = {

  //Types in model sails -> string / number / boolean / json / ref

tableName: 'packages',
attributes: 
{ 
  id: { // package_id int NOT NULL
    type: 'string', 
    columnName: 'package_id',
    columnType: 'integer',
    autoIncrement: true,
  },
  packageName: {  // package_name  varchar(255)  NOT  NULL
    type: 'string',
    required: true,
    columnType: 'varchar(255)',
    columnName: 'package_name',
    maxLength: 100,
    isNotEmptyString:true
  },
  
  packageActive: { // package_active  tinyint(1)  NOT NULL
    type: 'boolean',
    defaultsTo : true,
    columnType: 'boolean', 
    columnName: 'package_active', 
    
  },  

  packageProducts: {
    collection: 'packageProduct', //identifica la clase a la que pertenece cuando es mutiple
    via: 'packageProductPackageId' //identifica la propidad que lo enlaza, esta propiedad no existe como tal en la base	  
  },
  packageServices: {
    collection: 'packageService', //identifica la clase a la que pertenece cuando es mutiple
    via: 'packageServicePackageId' //identifica la propidad que lo enlaza, esta propiedad no existe como tal en la base	  
  },
},

}; 