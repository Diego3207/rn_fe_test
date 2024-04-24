module.exports = {
  
  tableName: 'roles',
  attributes: 
  {
    id: 
	{ 
      type: 'string',      
      columnType: 'integer',
      autoIncrement: true,
      columnName: 'role_id',
	},
	
	roleName: 
	{ 
      type: 'string',
      columnType: 'varchar(512)',
      columnName: 'role_name',
    },
	
	roleRights: //propiedad que enlaza el permiso con el rol (coleccion de permisos)
	{
      collection: 'roleright', //modelo al que pertenece la coleccion
	  via: 'roleRightRole'  //propiedad de modelo userright
    },
	
	
	roleActive : 
	{
      type: 'boolean',
      defaultsTo : true, 
      columnType: 'boolean',      
      columnName: 'role_active', 
    },


  },
  
  
};