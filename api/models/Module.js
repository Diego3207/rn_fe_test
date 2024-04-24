module.exports = {
  
  tableName: 'modules',
  attributes: 
  {
    id: 
	{ 
      type: 'string',      
      columnType: 'integer',
      autoIncrement: true,
      columnName: 'modules_id',
	},
	
	moduleName: 
	{ 
      type: 'string',
      columnType: 'varchar(512)',
      columnName: 'modules_name',
    },
	
	moduleDescription:
	{
	  type: 'string',
      columnType: 'varchar(512)',
      columnName: 'modules_description',
	},
	
	moduleActive : 
	{
      type: 'boolean',
      defaultsTo : true, 
      columnType: 'boolean',      
      columnName: 'modules_active', 
    },


  },
  
  
};