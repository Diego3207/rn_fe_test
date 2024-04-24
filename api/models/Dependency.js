module.exports = 
{
tableName: "dependencies",
attributes: 
{
    id: 
    { 
        type: 'string',   // dependency_id int NOT NULL
        columnName : 'dependency_id',
        columnType : 'integer',  
        autoIncrement: true,
    },
    dependencyDescription: // dependency_description varchar (255) NOT NULL
    {
        type : 'string',
        columnName : 'dependency_description',
        columnType : 'varchar(255)', 
    
    },
    dependencyDependencyCategoryId: //dependency_dependency_category_id int NOT NULL
    {
        columnName: 'dependency_dependency_category_id',
        model:'dependencyCategory',
    },
    dependencyAddress: // dependency_address varchar (255) NOT NULL
    {
        type : 'string',
        columnName : 'dependency_address',
        columnType : 'varchar(255)', 
    
    },
    dependencyActive :  // dependency_active tinyint(1) NOT NULL
    { 
        type: 'boolean',
        defaultsTo : true, 
        columnType: 'boolean',      
        columnName: 'dependency_active', 
    },
    dependencyPhones: {
        collection: 'dependencyPhone', 
        via: 'dependencyPhoneDependencyId' 
    },
  }
};

