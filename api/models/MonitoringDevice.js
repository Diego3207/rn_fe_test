module.exports = 
{
  tableName: "monitoring_devices",

  attributes: 
  {
    id: 
    { 
      type: 'string',  
      columnName : 'monitoring_device_id',
      columnType : 'integer',  
      autoIncrement: true,
    },

    monitoringDeviceName:
    {
      type : 'string',
      columnName : 'monitoring_device_name', 
      columnType : 'varchar(255)', 
      unique: true,
    },

    monitoringDeviceCostumerId: 
    {
      columnName : 'monitoring_device_costumer_id',
      model:'costumer',
    },

    monitoringDeviceType: 
    {
      type : 'string',
      columnName : 'monitoring_device_type',
      columnType : 'varchar(250)', 
    },

    monitoringDeviceProvider: 
    {
      columnName : 'monitoring_device_provider',
      type: 'boolean',
      defaultsTo : false, 
      columnType: 'boolean',  
    },

    monitoringDeviceActive : { 
      type: 'boolean',
      defaultsTo : true, 
      columnType: 'boolean',      
      columnName: 'monitoring_device_active', 
    }
  },
};
