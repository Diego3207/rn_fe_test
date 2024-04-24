module.exports = 
{
tableName: "incidences",
attributes: 
{
    id: 
    { 
        type: 'string',   // incidence_id int NOT NULL
        columnName : 'incidence_id',
        columnType : 'integer',  
        autoIncrement: true,
    },
    
    incidenceCostumerId: //incidence_costumer_id int NOT NULL
    {
        columnName: 'incidence_costumer_id',
        model:'costumer',
    },
    incidenceSourceInformation: //incidence_source_information ENUM('monitoreo','cliente')  
    {
        type:'string',
        required: true,
        isIn: ["monitoreo","cliente"],
        columnType: 'ENUM("monitoreo","cliente")',
        columnName: 'incidence_source_information', 
    
    },
    incidenceStartDateAttention: // incidence_start_date_attention DATETIME NOT NULL
    {
        type: 'ref',
        required: false,//estaba en true pero , da error si no la mando en el add
        columnType: 'DATETIME', 
        defaultsTo:null,
        columnName: 'incidence_start_date_attention',
    
    },
    incidenceInformantData: // incidence_informant_data varchar(255) NOT NULL
    {
        type : 'string',
        columnName : 'incidence_informant_data',
        columnType : 'varchar(255)', 
    
    },
    incidenceType: // incidence_type ENUM('operativa','preventiva','informativa')
    {
        type:'string',
        required: true,
        isIn: ["operativa","preventiva","informativa"],
        columnType: 'ENUM("operativa","preventiva","informativa")',
        columnName: 'incidence_type',
    
    },
    incidenceQuadrant: // incidence_quadrant varchar(255) NULL
    {
        type : 'string',
        columnName : 'incidence_quadrant',
        columnType : 'varchar(255)', 
    
    },
    incidenceStartDate: // incidence_start _date DATETIME NOT NULL
    {
        
        columnName : 'incidence_start _date',
        type: 'ref',
        required: false,//estaba en true pero , da error si no la mando en el add
        columnType: 'DATETIME', 
        defaultsTo:null,
        

    
    },
    incidenceEndDate: // incidence_end_date DATETIME NOT NULL
    {
        type : 'ref',
        columnName : 'incidence_end_date',
        required: false,//estaba en true pero , da error si no la mando en el add
        columnType: 'DATETIME', 
        defaultsTo:null,
    
    },
    incidenceDescription: // incidence_description TEXT NOT NULL
    {
        type : 'string',
        columnName : 'incidence_description',
        columnType : 'TEXT', 
    
    },
    incidenceDescriptionInvolvedPeople: // incidence_description_involved_people TEXT NOT NULL
    {
        type : 'string',
        columnName : 'incidence_description_involved_people',
        columnType : 'TEXT', 
    
    },
    incidenceDescriptionInvolvedVehicles: // incidence_description_involved_vehicles TEXT NOT NULL
    {
        type : 'string',
        columnName : 'incidence_description_involved_vehicles',
        columnType : 'TEXT', 
    
    },
   
    incidenceObservation: // incidence_observation TEXT NULL
    {
        type : 'string',
        columnName : 'incidence_observation',
        columnType : 'TEXT', 
    
    },
    
    incidenceIsPositive: // incidence_is_positive tinyint (1) NOT NULL
    {
        type : 'boolean',
        columnName : 'incidence_is_positive',
        columnType : 'tinyint (1)',

    
    },

    incidenceEndDateAttention: // incidence_end_date_attention DATETIME NOT NULL
    {
        type : 'ref',
        columnName : 'incidence_end_date_attention',
        required: false,//estaba en true pero , da error si no la mando en el add
        columnType: 'DATETIME', 
        defaultsTo:null, 
    
    },
    incidenceUserAttendedId:{ //incidence_user_attended_id INT NOT NULL
        columnName : 'incidence_user_attended_id',
        model:'user',

    },    
    incidenceActive :  // incidence_active tinyint(1) NOT NULL
    { 
        type: 'boolean',
        defaultsTo : true, 
        columnType: 'boolean',      
        columnName: 'incidence_active', 
    },
    incidenceInvolvedDevices: { //table incidence_involved_devices
        collection: 'incidenceInvolvedDevice', 
        via: 'incidenceInvolvedDeviceIncidenceId' 
    },
    incidenceEvidences:  //table incidence_evidences
    {
      collection: 'incidenceEvidence', 
      via: 'incidenceEvidenceIncidenceId'  
    },
    incidenceCoordinations:  //table incidence_coordinations
    {
      collection: 'incidenceCoordination', 
      via: 'incidenceCoordinationIncidenceId'  
    },
  
  }
};

