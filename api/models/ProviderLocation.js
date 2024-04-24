module.exports = {

    //Types in model sails -> string / number / boolean / json / ref

  tableName: 'provider_locations',
  attributes: 
  { 

    id: { // provider_location_id int NOT NULL
      type: 'string', 
      columnName: 'provider_location_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    providerLocationProviderId: { //provider_location_provider_id int  NOT NULL
      columnName: 'provider_location_provider_id',
      model:'provider',
    },
    providerLocationDescription: {  //provider_location_description  varchar(100)  NOT  NULL
      type: 'string',
      required: true,
      columnType: 'varchar(100)',
      columnName: 'provider_location_description',
      maxLength: 100,
      isNotEmptyString:true
    },
    providerLocationAddress: {  //provider_location_address  varchar(255)  NOT NULL
      type: 'string',
      required: true,
      columnType: 'varchar(255)',
      columnName: 'provider_location_address',
      maxLength: 100,
      isNotEmptyString:true
    },
    providerLocationActive : { // provider_location_active  inyint(1)   NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'provider_location_active', 
    }
  }   
};




  