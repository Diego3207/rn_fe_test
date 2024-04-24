module.exports = {

    tableName: 'evidence_installations',
    attributes: 
    { 
      
      id: { // evidence_installation_id int NOT NULL
        type: 'string', 
        columnName: 'evidence_installation_id',
        columnType: 'integer',
        autoIncrement: true,
      },
    
      evidenceInstallationPath: {  // evidence_installation_path varchar NOT NULL
        columnName: 'evidence_installation_path',
        columnType: 'varchar(255)',
        type:'string'
      },
      evidenceInstallationSize: {  // evidence_installation_size INT NOT NULL
        columnName: 'evidence_installation_size',
        columnType: 'integer',
        type:'ref'
      },
      evidenceInstallationName: {  // evidence_installation_name varchar NOT NULL
        columnName: 'evidence_installation_name',
        columnType: 'varchar(255)',
        type:'string'
      },
      evidenceInstallationDescription: { // evidence_installation_description TEXT NOT NULL
        columnName: 'evidence_installation_description', 
        type: 'string',
        columnType: 'text',  
      },
      evidenceInstallationActive : { // evidence_installation_active  inyint(1)   NOT NULL
        type: 'boolean',
        defaultsTo : true, // poner valor true (1) por default
        columnType: 'boolean',      
        columnName: 'evidence_installation_active', 
      },
    },
  }; 


  