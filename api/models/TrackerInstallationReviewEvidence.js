module.exports = {

  tableName: 'tracker_installation_review_evidences',
  attributes: 
  { 
    
    id: { 
      type: 'string', 
      columnName: 'tracker_installation_review_evidence_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    trackerInstallationReviewEvidenceTrackerInstallationReviewId: {  
      model:'trackerInstallationReview',
      columnName: 'tracker_installation_review_evidence_trackerInstallationReviewId',
    },
    trackerInstallationReviewEvidenceEvidenceInstallationId : {  
      columnName: 'tracker_installation_review_evidence_evidence_installation_id',
      model:'evidenceInstallation',
    },
    
    trackerInstallationReviewEvidenceActive : { 
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'tracker_installation_review_evidence_active', 
    },
  },
}; 
