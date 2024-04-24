module.exports = {

  //Types in model sails -> string / number / boolean / json / ref

  tableName: 'services',
  attributes: 
  { 
    id: { // service_id int NOT NULL
      type: 'string', 
      columnName: 'service_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    serviceDescription: {  // service_description varchar(50) NOT NULL
      type: 'string',
      required: true,
      columnType: 'varchar(255)',
      columnName: 'service_description',
      maxLength: 255,
      isNotEmptyString:true
    },
    serviceQuantityTemporality: {
      type: 'number',
      columnName: 'service_quantity_temporality',
      columnType : 'integer',
      allowNull: true
    },
    serviceTemporality: {
      type: 'string',
      columnName: 'service_temporality', 
      columnType: 'varchar(55)',// values => "anual","mensual"
      allowNull: true,    
    },
    servicePrice:
    {
      type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'double(12,2)', 
      columnName: 'service_price', 
      max:999999999999.00,
      isNumber: true
    },
    /* 
    serviceProviderId: { // service_provider_id  NOT NULL
       columnName: 'service_provider_id',
       model:'provider',
    },
   servicePerDiem: { // service_per_diem double(9,2) NOT NULL
      required: true, 
      type:'ref',////se pone en ref para que pueda filtrar con el match `contains`
      columnType: 'double(9,2)',      
      columnName: 'service_per_diem', 
      max:9999999.00,
      isNumber:true,
    },
    serviceCoverZone: { // service_cover_zone varchar(15) NOT NULL
      required: true,
      type: 'string',
      columnType: 'varchar(100)',      
      columnName: 'service_cover_zone', 
      maxLength: 100,
      isNotEmptyString:true
    },
    serviceResponseTime : { // service_reponse_time int(5) NOT NULL
      required: true,
      type: 'ref', ////se pone en ref para que pueda filtrar con el match `contains`
      columnType: 'int(5)',      
      columnName: 'service_response_time', 
      isNumber:true,
      max: 365,
      
    },
    serviceBill: { // service_bill tinyint NOT NULL ---- boolean
      required: true,
      type: 'boolean',
      columnType: 'boolean',      
      columnName: 'service_bill', 
    },
    serviceGuarranty: { // service_guarranty tinyint NOT NULL
      required: true,
      type: 'boolean',
      columnType: 'boolean', //poner TINYINT(1) o boolean es lo mismo      
      columnName: 'service_guarranty', 
    },*/
    serviceActive : {  //service_active  tinyint(1)   NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'service_active', 
    }
  }   
};

