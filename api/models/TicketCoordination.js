module.exports = 
{
tableName: "ticket_coordinations",
attributes: 
{
    id: { 
        type: 'string',   
        columnName : 'ticket_coordination_id',
        columnType : 'integer',  
        autoIncrement: true,
    },

    ticketCoordinationTicketId: {
        columnName: 'ticket_coordination_ticket_id',
        model:'ticket',
    },

    ticketCoordinationDependencyPhoneId: {
        columnName: 'ticket_coordination_dependency_phone_id',
        model:'dependencyPhone',
    },   
    
    ticketCoordinationActive:  
    { 
        type: 'boolean',
        defaultsTo : true, 
        columnType: 'boolean',      
        columnName: 'ticket_coordination_active', 
    },
    
  }
};

