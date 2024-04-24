module.exports = {

    //Types in model sails -> string / number / boolean / json / ref

  tableName: 'products_files',
  attributes: 
  { 

    id: { 
      type: 'string', 
      columnName: 'product_file_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    productFileProductId: { //enlace al producto al que estan enlazados los archivos
      columnName: 'product_file_product_id',
      model:'product',
    },
    ProductCategoryId: {  
      columnName: 'product_category_id',
      model:'productCategory',
    },  
    productFileName: { 
      columnName: 'product_file_name',
      type: 'string',
      required: true,
      columnType: 'varchar(250)',
    },
    productFileSize: { 
      columnName: 'product_file_size',
      type: 'ref',
      columnType: 'integer',
      required: true,
    },
    productFileDocumentation: {
      columnName: 'product_file_documentation',  
      type: 'string',
      required: true,
      columnType: 'varchar(250)',
    },
    productFileActive : { 
      columnName: 'product_file_active',
      type: 'boolean',
      defaultsTo : true, 
      columnType: 'boolean',      
    }
  }   
};




  