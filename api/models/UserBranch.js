module.exports = {
  
  tableName: 'user_branches',
  attributes: 
  {
    id: 
	{ 
      type: 'string',      
      columnType: 'integer',
      autoIncrement: true,
      columnName: 'user_branch_id',
	},
	
	userBranchActive : 
	{
      type: 'boolean',
      defaultsTo : true, 
      columnType: 'boolean',      
      columnName: 'user_branch_active', 
    },
	
	userBranchBranch: //enlace a propiedades del catalogo de sucursales
	{     
      columnType: 'integer',
      columnName: 'user_branch_branch',
	  model:'branch'
 	},
	
	userBranchUser: //enlace al usuario al que esta enlazada la sucursal
	{     
      columnType: 'integer',
      columnName: 'user_branch_user',
	    model:'user'
 	},
	
	userBranchRole:  //rol al que esta asociado este perfil de sucursal
	{
	  model:'role',
	  columnType: 'integer',
	  columnName: 'user_branch_role',
	},	

  },
  
};