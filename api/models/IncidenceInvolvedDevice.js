module.exports = 
{
tableName: "incidence_involved_devices",
attributes: 
{
    id: 
    { 
        type: 'string',   // incidence_involved_device_id int NOT NULL
        columnName : 'incidence_involved_device_id',
        columnType : 'integer',  
        autoIncrement: true,
    },
    incidenceInvolvedDeviceIncidenceBackDeviceId : //incidence_involved_device_incidence_back_device_id int NOT NULL
    {
        columnName: 'incidence_involved_device_incidence_back_device_id',
        model:'incidenceBackDevice',
    },
    incidenceInvolvedDeviceIncidenceId: //incidence_involved_device_incidence_id INT NOT NULL  INT NOT NULL 
    {
        columnName: 'incidence_involved_device_incidence_id',
        model:'incidence',
    },
    incidenceInvolvedDeviceFailed:  // incidence_involved_device_failed tinyint(1) NULL
    { 
        type: 'boolean',
        columnType: 'boolean',      
        columnName: 'incidence_involved_device_failed', 
    },
    incidenceInvolvedDeviceActive:  // incidence_involved_device_active tinyint(1) NOT NULL
    { 
        type: 'boolean',
        defaultsTo : true, 
        columnType: 'boolean',      
        columnName: 'incidence_involved_device_active', 
    },
    
  }
};

