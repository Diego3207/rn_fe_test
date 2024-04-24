module.exports = 
{
tableName: "tracker_installations",
attributes: 
{
    id: 
    { 
        type: 'string',  
        columnName : 'tracker_installation_id',
        columnType : 'integer',  
        autoIncrement: true,
    },
    trackerInstallationCostumerId:
    {
        columnName: 'tracker_installation_costumer_id',
        model:'costumer',
    },
    trackerInstallationVehicleId:
    {
        columnName: 'tracker_installation_vehicle_id',
        model:'vehicle',
    },
    trackerInstallationTrackerId: 
    {
        columnName: 'tracker_installation_tracker_id',
        model:'tracker',
    },
    trackerInstallationInstallerId: 
    {
        columnName: 'tracker_installation_installer_id',
        model:'installer',
    },
    trackerInstallationDate: 
    {
        type: 'ref',
        required: false,
        columnType: 'DATE', 
        defaultsTo:null,
        columnName: 'tracker_installation_date', 
    },
    trackerInstallationEngineStop: 
    {
        type: 'boolean',
        defaultsTo : true, 
        columnType: 'boolean',      
        columnName: 'tracker_installation_engine_stop', 
    },
    trackerInstallationTypeCut: 
    {
        type : 'string',
        columnName : 'tracker_installation_type_cut',
        columnType : 'varchar(100)', 
    },
    trackerInstallationEvidences: 
    {
      collection: 'trackerInstallationEvidence', 
      via: 'trackerInstallationEvidenceTrackerInstallationId'  
    },
    
    trackerInstallationAccessories: 
    {
        collection: 'trackerInstallationAccessory', 
        via: 'trackerInstallationAccessoryTrackerInstallationId'
    },
    trackerInstallationLocation: 
    {
        type : 'string',
        columnName : 'tracker_installation_location',
        columnType : 'varchar(100)', 
    },
    trackerInstallationIsUninstalled:{ //tracker_installation_is_uninstalled tinyint(1) NOT NULL
        type: 'boolean',
        defaultsTo : false, 
        columnType: 'boolean',      
        columnName: 'tracker_installation_is_uninstalled', 
    },
    trackerInstallationActive : 
    { 
        type: 'boolean',
        defaultsTo : true, 
        columnType: 'boolean',      
        columnName: 'tracker_installation_active', 
    }
  }
};

