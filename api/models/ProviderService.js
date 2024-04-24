module.exports = {

    //Types in model sails -> string / number / boolean / json / ref

  tableName: 'provider_services',
  attributes: 
  { 

    id: { // provider_product_id int NOT NULL
      type: 'string', 
      columnName: 'provider_service_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    providerServiceProviderId: { //provider_service_provider_id int  NOT NULL
      columnName: 'provider_service_provider_id',
      model:'provider',
    },
    providerServiceServiceId: {  //provider_service_service_id int  NOT NULL
      columnName: 'provider_service_service_id',
      model:'service',
    },
    providerServiceGuaranteeUnit: {  
      type: 'number',
      columnName: 'provider_service_guarantee_unit',
      columnType: 'integer',
    },
    providerServiceGuaranteeUnitMeasure: {  
      type: 'string',
      columnName: 'provider_service_guarantee_unit_measure',
      columnType: 'varchar(100)',
    },
    providerServiceGuaranteeSpecifications: {  
      type: 'string',
      columnName: 'provider_service_guarantee_specifications',
      columnType: 'varchar(250)',
    },
    providerServiceActive : { // provider_service_active  inyint(1)   NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'provider_service_active', 
    }
  }   
};




  