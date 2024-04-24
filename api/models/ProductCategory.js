module.exports = {

    //Types in model sails -> string / number / boolean / json / ref

  tableName: 'product_categories',
  attributes: 
  { 
    id: {   //tracker_id int NOT NULL
      type: 'string', //number
      columnName: 'product_category_id',
      columnType: 'integer',
      autoIncrement: true,
    },
   
    productCategoryDescription: { // 'product_category_description varchar(255) NOT NULL
      type: 'string', 
      columnType: 'varchar(255)',
      columnName: 'product_category_description',
      maxLength: 255,
      isNotEmptyString:true
    },
    
    productCategoryActive : { // product _active  inyint(1)   NOT NULL
      type: 'boolean',
      defaultsTo : true, 
      columnType: 'boolean',      
      columnName: 'product_category_active', 
    },
   
  }   
};

  