module.exports = {

    //Types in model sails -> string / number / boolean / json / ref

  tableName: 'costumer_contacts',
  attributes: 
  { 

    id: { // costumer_contact_id int NOT NULL
      type: 'string', 
      columnName: 'costumer_contact_id',
      columnType: 'integer',
      autoIncrement: true,
    },

    costumerContactCostumerId: { //  costumer_ contact_costumer_id int  NOT NULL
      columnName: 'costumer_contact_costumer_id',
      model:'costumer',
      
   },

   costumerContactName: {  //costumer_ contact_name  varchar(100)  NOT  NULL
      type: 'string',
      required: true,
      columnType: 'varchar(100)',
      columnName: 'costumer_contact_name',
      maxLength: 100,
      isNotEmptyString:true
    },

    costumerContactPhone: {  //costumer_contact_phone varchar(15)  NOT NULL
        type: 'string',//'ref',////se pone en ref para que pueda filtrar con el match `contains`
        required: true,
        columnType: 'varchar(15)',      
        columnName: 'costumer_contact_phone', 
        maxLength: 15,
        isNotEmptyString:true
      },

    costumerContactEmail: {  //costumer_contact_email  varchar(100)  NOT NULL
      type: 'string',
      required: true,
      columnType: 'varchar(100)',
      columnName: 'costumer_contact_email',
      maxLength: 100,
      isNotEmptyString:true,
      isEmail:true
    },

    costumerContactDepartment: {  //costumer_ contact_description  varchar(100)  NOT  NULL
        type: 'string',
        required: true,
        columnType: 'varchar(100)',
        columnName: 'costumer_contact_department',
        maxLength: 100,
        isNotEmptyString:true
    },
    
    costumerContactActive : { // costumer_contact_active  inyint(1)   NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'costumer_contact_active', 
    }
  }   
};




  