module.exports = {

    tableName: 'tickets',
    attributes: 
    { 
      id: { 
        type: 'string', 
        columnName: 'ticket_id',
        columnType: 'integer',
        autoIncrement: true, 
      }, 
      
      ticketFolio: { 
        type: 'string',
        required: false,
        columnType: 'varchar(50)', 
        columnName: 'ticket_folio', 
      },

      ticketCostumerId: { 
        columnName: 'ticket_costumer_id', 
        model:'costumer',
      }, 

      ticketUserId: { 
        columnName: 'ticket_user_id', 
        model:'user',
      },

      ticketCoordinations: {
        collection: 'ticketCoordination', 
        via: 'ticketCoordinationTicketId'  
      },

      ticketDevices: {
        collection: 'ticketmonitoringdevice', 
        via: 'ticketMonitoringdeviceTicketId'  
	    },

      ticketDate: {
        type: 'ref',
        required: false,
        columnType: 'DATETIME', 
        defaultsTo:null,
        columnName: 'ticket_date',
      },

      ticketEndDate: {
        type: 'ref',
        required: false,
        columnType: 'DATETIME', 
        columnName: 'ticket_end_date',
      },

      ticketDescription: {  
        type: 'string',
        required: true,
        columnType: 'varchar(255)', 
        columnName: 'ticket_description', 
      }, 

      ticketObservation: {  
        type:'ref',
        required: false,
        columnType:'text',
        columnName: 'ticket_observation',
      }, 

      ticketStatus: {  
        type:'string',
        required: true,
        isIn: ["nuevo","pendiente","cerrado"],
        columnType: 'ENUM("nuevo","pendiente","cerrado")',
        columnName: 'ticket_status', 
      }, 
      
      ticketActive: { 
        type: 'boolean',
        defaultsTo : true,
        columnType: 'boolean', 
        columnName: 'ticket_active', 
      },
    },
  }; 