module.exports = 
{
tableName: "incidence_back_devices",
attributes: 
{
    id: 
    { 
        type: 'string',  // incidence_back_device_id int NOT NULL
        columnName : 'incidence_back_device_id',
        columnType : 'integer',  
        autoIncrement: true,
    },
    
    incidenceBackDeviceMonitoringName:  // incidence_back_device_monitoring_type varchar(255) not NULL
    { 
        type: 'string',
        columnType: 'varchar(255)',      
        columnName: 'incidence_back_device_monitoring_name', 
    },
    incidenceBackDeviceMonitoringDeviceId : //incidence_back_device_monitoring_device_id int NOT NULL
    {
        columnName: 'incidence_back_device_monitoring_device_id',
        model:'monitoringDevice',
    },
    incidenceBackDeviceMonitoringDeviceCustomerId: // incidence_back_device_monitoring_device_customer_id INT NOT NULL
    {
        columnName: 'incidence_back_device_monitoring_device_customer_id',
        model:'costumer',
    },
    incidenceBackDeviceMonitoringType:  // incidence_back_device_monitoring_type varchar(255) not NULL
    { 
        type: 'string',
        columnType: 'varchar(255)',      
        columnName: 'incidence_back_device_monitoring_type', 
    },
    incidenceBackDeviceMonitoringProviderType:{ //incidence_back_device_monitoring_provider_type tinyint(1) not NULL
        type: 'boolean',
        columnType: 'boolean',      
        columnName: 'incidence_back_device_monitoring_provider_type'
    },
    incidenceBackActive:  // incidence_back_active tinyint(1) NOT NULL
    { 
        type: 'boolean',
        defaultsTo : true, 
        columnType: 'boolean',      
        columnName: 'incidence_back_device_active', 
    },
    
  }
};

