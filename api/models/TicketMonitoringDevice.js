module.exports = {

    tableName: 'ticket_monitoring_devices',
    attributes: 
    { 
        id: { 
            type: 'string', 
            columnName: 'ticket_monitoring_device_id',
            columnType: 'integer',
            autoIncrement: true, 
        }, 

        ticketMonitoringdeviceMonitoringDeviceId: { 
            columnType: 'integer',
            columnName: 'ticket_monitoring_device_monitoring_device_id',
            model:'monitoringDevice',
        },

        ticketMonitoringdeviceTicketId: { 
            columnType: 'integer',
            columnName: 'ticket_monitoring_device_ticket_id',
            model:'ticket',
        },

        ticketMonitoringdeviceActive: { 
            type: 'boolean',
            defaultsTo : true,
            columnType: 'boolean', 
            columnName: 'ticket_monitoring_device_active', 
        }
    },
  }; 