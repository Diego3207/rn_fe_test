module.exports = 
{
  tableName: "vehicles",

  attributes: 
  {
    id: 
    { 
      type: 'string',  
      columnName : 'vehicle_id',
      columnType : 'integer',  
      autoIncrement: true,
    },
    vehicleCostumerId:
    {
        columnName: 'vehicle_costumer_id',
        model:'costumer',
    },
    vehicleBrand:
    {
      type : 'string',
      columnName : 'vehicle_brand', 
      columnType : 'varchar(100)', 
    },
    vehicleModel: 
    {
      type : 'string',
      columnName : 'vehicle_model',
      columnType : 'varchar(100)', 
    },
    vehicleYear: 
    {
      type : 'string',
      columnName : 'vehicle_year',
      columnType : 'varchar(4)', 
    },
    vehicleVin: 
    {
      type : 'string',
      columnName : 'vehicle_vin',
      columnType : 'varchar(18)', 
    },
    vehiclePlateNumber: 
    {
      type : 'string',
      columnName : 'vehicle_plate_number',
      columnType : 'varchar(8)', 
    },
    vehicleColor: 
    {
      type : 'string',
      columnName : 'vehicle_color',
      columnType : 'varchar(50)', 
    },
    vehicleActive : { 
      type: 'boolean',
      defaultsTo : true, 
      columnType: 'boolean',      
      columnName: 'vehicle_active', 
    }
  },
};

