module.exports = 
{
  tableName: "locations",

  attributes: 
  {
    id: 
    { 
      type: 'string',  
      columnName : 'location_id',
      columnType : 'integer',  
      autoIncrement: true,
      },
    locationName:
    {
      type : 'string',
      columnName : 'location_name', 
      columnType : 'varchar(50)', 
      unique: true,
      },
    locationAddress: 
    {
      type : 'string',
      columnName : 'location_address',
      columnType : 'varchar(250)', 
      },
    locationPhone: 
    {
      type : 'string',
      columnName : 'location_phone',
      columnType : 'varchar(250)', 
      },
    locationLat: 
    {
      columnName : 'locationLat',
      type : 'ref',
      columnType : 'float(11,7)', 
      },
    locationLng: 
    {
      columnName : 'locationLng',
      type : 'ref',
      columnType : 'float(11,7)', 
      },
    locationActive : { 
      type: 'boolean',
      defaultsTo : true, 
      columnType: 'boolean',      
      columnName: 'location_active', 
    }
  },
};
