module.exports = 
{
tableName: "tracker_installation_reviews",
attributes: 
{
    id: 
    { 
        type: 'string',   // tracker_installation_review_id int NOT NULL
        columnName : 'tracker_installation_review_id',
        columnType : 'integer',  
        autoIncrement: true,
    },
    trackerInstallationReviewTrackerInstallationId: // tracker_installation_review_tracker_installation_id int NOT NULL 
    {
        columnName: 'tracker_installation_review_tracker_installation_id',
        model:'trackerInstallationReview',
    
    },
    trackerInstallationReviewTechnicalUserId: // tracker_installation_review_technical_user_id int NOT NULL
    {
        columnName: 'tracker_installation_review_technical_user_id',
        model:'installer', 
    },
    trackerInstallationReviewAddress: // tracker_installation_review_address varchar(255) NOT NULL
    {
        
        type: 'string',
        columnType: 'varchar(255)', 
        columnName : 'tracker_installation_review_address',
    
    },
    trackerInstallationReviewDate :  // tracker_installation_review_date DATE NOT NULL
    { 
        type: 'ref',
        required: false,
        columnType: 'DATE', 
        defaultsTo: null, 
        columnName: 'tracker_installation_review_date', 
    },
    trackerInstallationReviewObservation:  //tracker_installation_review_observation TEXT
    { 
        columnName: 'tracker_installation_review_observation',
        columnType: 'TEXT', 
        type:'string'
         
    },
    trackerInstallationReviewRegisteredUserId :  // tracker_installation_review_registered_user_id int not null
    { 
        columnName: 'tracker_installation_review_registered_user_id',
        model:'user',  
    },

    trackerInstallationReviewActive :  // tracker_installation_review_active tinyint(1) NOT NULL
    { 
        type: 'boolean',
        defaultsTo : true, 
        columnType: 'boolean',      
        columnName: 'tracker_installation_review_active', 
    },
    trackerInstallationReviewEvidences: 
    {
      collection: 'trackerInstallationReviewEvidence', 
      via: 'trackerInstallationReviewEvidenceTrackerInstallationReviewId'  
    },
  }
};

