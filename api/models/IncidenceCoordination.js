module.exports = 
{
tableName: "incidence_coordinations",
attributes: 
{
    id: 
    { 
        type: 'string',   // incidence_coordination_id int NOT NULL
        columnName : 'incidence_coordination_id',
        columnType : 'integer',  
        autoIncrement: true,
    },
    incidenceCoordinationIncidenceId: //incidence_coordination_incidence_id INT NOT NULL  INT NOT NULL 
    {
        columnName: 'incidence_coordination_incidence_id',
        model:'incidence',
    },
    incidenceCoordinationDependencyPhoneId: //incidence_coordination_dependency_phone_id INT NOT NULL
    {
        columnName: 'incidence_coordination_dependency_phone_id',
        model:'dependencyPhone',
    },   
    incidenceCoordinationActive:  // incidence_coordination_active tinyint(1) NOT NULL
    { 
        type: 'boolean',
        defaultsTo : true, 
        columnType: 'boolean',      
        columnName: 'incidence_coordination_active', 
    },
    
  }
};

