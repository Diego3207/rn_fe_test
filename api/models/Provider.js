module.exports = {

    //Types in model sails -> string / number / boolean / json / ref

  tableName: 'providers',
  attributes: 
  { 
    id: { // provider_id int NOT NULL
      type: 'string', //number
      columnName: 'provider_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    providerName: {  // provider_name  varchar(100)  NOT  NULL
      type: 'string',
      required: true,
      columnType: 'varchar(100)',
      columnName: 'provider_name',
      maxLength: 100,
      unique: true,
    },
    providerNationality: { // provider_nationality varchar(55)  NOT  NULL
      type: 'string', 
      columnType: 'varchar(55)',
      columnName: 'provider_nationality',
      maxLength: 55,
      isNotEmptyString:true
    },
    providerLine: { // provider_line varchar(55)  NOT  NULL
      type: 'string',
      required: true,
      columnType: 'varchar(255)', 
      columnName: 'provider_line', 
      maxLength: 255,
      isNotEmptyString:true
    },
    providerActive : { // provider_active  inyint(1)   NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'provider_active', 
    },
    providerContacts: {
      collection: 'providerContact', 
	    via: 'providerContactProviderId' 
    },
    providerLocations: {
      collection: 'providerLocation', 
	    via: 'providerLocationProviderId' 	  
    },
    providerProducts: {
      collection: 'providerProduct', 
	    via: 'providerProductProviderId'	  
    },
    providerServices: {
      collection: 'providerService', 
	    via: 'providerServiceProviderId'	  
    },
  }   
};

  