module.exports = {

  tableName: 'tracker_installation_accessories',
  attributes: 
  { 

    id: { 
      type: 'string', 
      columnName: 'tracker_installation_accessory_id',
      columnType: 'integer',
      autoIncrement: true,
    },   

    trackerInstallationAccessoryTrackerInstallationId: { 
      columnName: 'tracker_installation_accessory_tracker_installation_id',
      model:'trackerInstallation',
    },
    
    trackerInstallationAccessoryProductId: {  
      columnName: 'tracker_installation_accessory_product_id',
      model:'product',
    },
    trackerInstallationAccessoryActive : { 
      type: 'boolean',
      defaultsTo : true, 
      columnType: 'boolean',      
      columnName: 'tracker_installation_accessory_active', 
    }
  }   
};




  