module.exports = 
{
tableName: "tracker_uninstalls",
attributes: 
{
    id: 
    { 
        type: 'string',   // tracker_uninstall_id int NOT NULL
        columnName : 'tracker_uninstall_id',
        columnType : 'integer',  
        autoIncrement: true,
    },
    trackerUninstallTrackerInstallationId: // tracker_uninstall_tracker_installation_id int NOT NULL 
    {
        columnName: 'tracker_uninstall_tracker_installation_id',
        model:'trackerInstallation',
    
    },
    trackerUninstallAddress: // tracker_uninstall_address varchar(100) NOT NULL
    {
        columnName: 'tracker_uninstall_address',
        type : 'string',
        columnType : 'varchar(255)', 
    },
    trackerUninstallDate: // tracker_unistall_date DATE NOT NULL
    {
        
        type: 'ref',
        required: false,
        columnType: 'DATE', 
        defaultsTo: null,
        columnName : 'tracker_unistall_date',
    
    },
    trackerUninstallObservation :  // tracker_uninstall_observation TEXT
    { 
        type: 'string',
        columnType: 'text',      
        columnName: 'tracker_uninstall_observation', 
    },
    trackerUninstallUninstallerUserId:  // tracker_uninstall_uninstaller_user_id int NOT NULL
    { 
        columnName: 'tracker_uninstall_uninstaller_user_id',
        model:'installer', 
         
    },
    trackerUninstallRegisteredUserId :  // tracker_uninstall_registered_user_id int not null
    { 
        columnName: 'tracker_uninstall_registered_user_id',
        model:'user',  
    },
    trackerUninstallActive :  // tracker_uninstall_active tinyint(1) NOT NULL
    { 
        type: 'boolean',
        defaultsTo : true, 
        columnType: 'boolean',      
        columnName: 'tracker_uninstall_active', 
    },
    trackerUninstallEvidences: 
    {         
      collection: 'trackerUninstallEvidence', 
      via: 'trackerUninstallEvidenceTrackerUninstallId'  
    },
    
  }
};

