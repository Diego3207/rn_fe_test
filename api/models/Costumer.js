module.exports = {

    //Types in model sails -> string / number / boolean / json / ref

  tableName: 'costumers',
  attributes: 
  { 
    id: { 
        type: 'string',
        columnName: 'costumer_id',
        columnType: 'integer',
        autoIncrement: true,
    },
    costumerName: {  
        type: 'string',
        required: true,
        columnType: 'varchar(100)',
        columnName: 'costumer_name',
        unique: true,
        maxLength: 100,
        isNotEmptyString:true
    },
    costumerBussinessName: {  
        type: 'string',
        required: false,
        columnType: 'varchar(100)',
        columnName: 'costumer_bussiness_name',
        maxLength: 100
    },
    costumerRfc: { 
        type: 'string',
        required: false,
        columnType: 'varchar(100)',
        columnName: 'costumer_rfc',
        maxLength: 100
    },
    costumerAddress: {  
        type: 'string',
        required: false,
        columnType: 'varchar(250)',
        columnName: 'costumer_address',
        maxLength: 250
    },
    /*costumerLat: 
    {
        columnName : 'costumer_lat',
        type : 'ref',
        columnType : 'float(11,7)', 
      },
    costumerLng: 
    {
        columnName : 'costumer_lng',
        type : 'ref',
        columnType : 'float(11,7)', 
      },*/
    costumerWebSite: {  
        type: 'string',
        required: false,
        columnType: 'varchar(100)',
        columnName: 'costumer_web_site',
        maxLength: 100
    },
    costumerGroup: {  
        type: 'string',
        required: false,
        columnType: 'varchar(100)',
        columnName: 'costumer_group',
        maxLength: 100,
        //
    },
    costumerIsClient: { 
        type: 'boolean',
        defaultsTo : false, // poner valor false (0) por default
        columnType: 'boolean',      
        columnName: 'costumer_status', 
    },
    costumerActive : { 
        type: 'boolean',
        defaultsTo : true, 
        columnType: 'boolean',      
        columnName: 'costumer_active', 
    },
    costumerContacts: {
        collection: 'costumerContact', 
        via: 'costumerContactCostumerId' 
    },
    costumerDataBanks: {
        collection: 'costumerDataBank', 
        via: 'costumerDataBankCostumerId'	  
    },
  }   
};