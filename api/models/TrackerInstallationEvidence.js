module.exports = {

    tableName: 'tracker_installation_evidences',
    attributes: 
    { 
      
      
      id: { // tracker_installation_evidence_id int NOT NULL
        type: 'string', 
        columnName: 'tracker_installation_evidence_id',
        columnType: 'integer',
        autoIncrement: true,
      },
      trackerInstallationEvidenceTrackerInstallationId: {  //tracker_installation_evidence_tracker_installation_id  INT  NULL  INT  NULL
        columnName:  'tracker_installation_evidence_tracker_installation_id',
        model:'trackerInstallation',
      },
      trackerInstallationEvidenceEvidenceInstallationId : {  // tracker_installation_evidence_evidence_installation_id  INT  NULL
        columnName: 'tracker_installation_evidence_evidence_installation_id',
        model:'evidenceInstallation',
      },      
      trackerInstallationEvidenceActive : { // tracker_installation_evidence_active  tinyint(1) NOT NULL
        type: 'boolean',
        defaultsTo : true, // poner valor true (1) por default
        columnType: 'boolean',      
        columnName: 'tracker_installation_evidence_active', 
      },
    },
  }; 



  