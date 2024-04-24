module.exports = {

    tableName: 'incidence_evidences',
    attributes: 
    { 
      
      id: { //incidence_evidence_id int NOT NULL
        type: 'string', 
        columnName: 'incidence_evidence_id',
        columnType: 'integer',
        autoIncrement: true,
      },
      incidenceEvidenceIncidenceId: {  // incidence_evidence_incidence_id  INT  NULL
        columnName: 'incidence_evidence_incidence_id',
        model:'incidence',
      },
      incidenceEvidencePath: {  //  incidence_evidence_path varchar NOT NULLL
        columnName: 'incidence_evidence_path',
        columnType: 'varchar(255)',
        type:'string'
      },
      incidenceEvidenceSize: {  //  incidence_evidence_size INT NOT NULLL
        columnName: 'incidence_evidence_size',
        columnType: 'integer',
        type:'ref'
      },
      incidenceEvidenceName: {  //  incidence_evidence_name varchar NOT NULLL
        columnName: 'incidence_evidence_name',
        columnType: 'varchar(255)',
        type:'string'
      },
      incidenceEvidenceActive : { //  incidence_evidence_active  inyint(1)   NOT NULL
        type: 'boolean',
        defaultsTo : true, // poner valor true (1) por default
        columnType: 'boolean',      
        columnName: 'incidence_evidence_active', 
      },
    },
  }; 


  