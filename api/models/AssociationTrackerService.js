module.exports = {

    tableName: 'association_tracker_services',
    attributes: 
    { 
        id: { 
            type: 'string', 
            columnName: 'association_tracker_service_id',
            columnType: 'integer',
            autoIncrement: true, 
        }, 

        associationTrackerServiceQuotationSaleServiceId: { 
            columnType: 'integer',
            columnName: 'association_tracker_service_quotation_sale_service_id',
            model:'QuotationSaleService',
        },

        associationTrackerServiceTrackerInstallationId: { 
            columnType: 'integer',
            columnName: 'association_tracker_service_tracker_installation_id',
            model:'TrackerInstallation',
        },

        associationTrackerServiceActive: { 
            type: 'boolean',
            defaultsTo : true,
            columnType: 'boolean', 
            columnName: 'association_tracker_service_active', 
        }
    },
  }; 