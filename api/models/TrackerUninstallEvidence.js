module.exports = 
{
tableName: "tracker_uninstall_evidences",
attributes: 
{
    id: 
    { 
        type: 'string',   // tracker_uninstall_evidence_id int NOT NULL
        columnName : 'tracker_uninstall_evidence_id',
        columnType : 'integer',  
        autoIncrement: true,
    },
    trackerUninstallEvidenceTrackerUninstallId: // tracker_uninstall_evidence_tracker_uninstall_id  INT  NULL
    {
        columnName: 'tracker_uninstall_evidence_tracker_uninstall_id',
        model:'trackerUninstall',
    
    },
    
    trackerUninstallEvidenceEvidenceInstallationId : // tracker_uninstall_evidence_evidence_installation_id  INT  NULL
    {
        columnName: 'tracker_uninstall_evidence_evidence_installation_id',
        model:'evidenceInstallation',
    },
    
    trackerUninstallEvidenceActive:  // tracker_uninstall_evidence_active  tinyint(1) NOT NULL
    { 
        type: 'boolean',
        defaultsTo : true, 
        columnType: 'boolean',      
        columnName: 'tracker_uninstall_evidence_active', 
    },
    
  }
};

