module.exports = 
{
  tableName: "installers",

  attributes: 
  {
    id: 
    { 
      type: 'string',  
      columnName : 'installer_id',
      columnType : 'integer',  
      autoIncrement: true,
    },
    installerName:
    {
      type : 'string',
      columnName : 'installer_name', 
      columnType : 'varchar(100)', 
    },
    installerAddress: 
    {
      type : 'string',
      columnName : 'installer_address',
      columnType : 'varchar(100)', 
    },
    installerPhone: 
    {
      type : 'string',
      columnName : 'installer_phone',
      columnType : 'varchar(18)', 
    },
    installerActive : { 
      type: 'boolean',
      defaultsTo : true, 
      columnType: 'boolean',      
      columnName: 'installer_active', 
    }
  },
};
