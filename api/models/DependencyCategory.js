module.exports = {

  tableName: 'dependency_categories',
  attributes: 
  { 

    id: {  //dependency category_id int NOT NULL
      type: 'string', 
      columnName: 'dependency_category_id',
      columnType: 'integer',
      autoIncrement: true,
    },   
    dependencyCatergoryDescription: {  //dependency_category_description varchar (255) NOT NULL
      type: 'string',
      columnName: 'dependency_category_description',
      columnType : 'varchar(255)', 
    },
    dependencyCatergoryActive : { //dependency_category_active tinyint(1) NOT NULL
      type: 'boolean',
      defaultsTo : true, 
      columnType: 'boolean',      
      columnName: 'dependency_category_active', 
    }
  }   
};




  