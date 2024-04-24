module.exports = {
  
  tableName: 'branches',
  attributes: 
  {
    id: 
	{ 
      type: 'string',      
      columnType: 'integer',
      autoIncrement: true,
      columnName: 'branch_id',
	},
	
	branchActive : 
	{
      type: 'boolean',
      defaultsTo : true, 
      columnType: 'boolean',      
      columnName: 'branch_active', 
    },
	
	branchName:
	{     
	  type: 'string',
      columnType: 'varchar(255)',
	  columnName: 'branch_name',	  
 	},	

  },
  
};