module.exports = {

    //Types in model sails -> string / number / boolean / json / ref

  tableName: 'provider_contacts',
  attributes: 
  { 

    id: { // provider_contact_id int NOT NULL
      type: 'string', 
      columnName: 'provider_contact_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    providerContactProviderId: { //  provider_ contact_provider_id int  NOT NULL
      columnName: 'provider_contact_provider_id',
      model:'provider',
      
   },
   providerContactDescription: {  //provider_ contact_description  varchar(100)  NOT  NULL
      type: 'string',
      required: true,
      columnType: 'varchar(100)',
      columnName: 'provider_contact_description',
      maxLength: 100,
      isNotEmptyString:true
    },
    providerContactPhone: {  //provider_contact_phone varchar(15)  NOT NULL
        type: 'string',//'ref',////se pone en ref para que pueda filtrar con el match `contains`
        required: true,
        columnType: 'varchar(15)',      
        columnName: 'provider_contact_phone', 
        maxLength: 15,
        isNotEmptyString:true
      },
    providerContactEmail: {  //provider_contact_email  varchar(100)  NOT NULL
      type: 'string',
      required: true,
      columnType: 'varchar(100)',
      columnName: 'provider_contact_email',
      maxLength: 100,
      isNotEmptyString:true,
      isEmail:true
    },
    providerContactActive : { // provider_contact_active  inyint(1)   NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'provider_contact_active', 
    }
  }   
};




  