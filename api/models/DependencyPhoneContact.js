module.exports = {

  tableName: 'dependency_phone_contacts',
  attributes: 
  { 

    id: { //dependency_phone_contact_id int NOT NULL
      type: 'string', 
      columnName: 'dependency_phone_contact_id',
      columnType: 'integer',
      autoIncrement: true,
    },   

    dependencyPhoneContactName: { // dependency_phone_contact_name varchar (255) NULL
      type: 'string',
      columnName: 'dependency_phone_contact_name',
      columnType : 'varchar(255)',
      allowNull: true
    },
    
    dependencyPhoneContactJob: {  // dependency_phone_contact_job varchar (255) NULL
      type: 'string',
      columnName: 'dependency_phone_contact_job',
      columnType : 'varchar(255)',
      allowNull: true
    },
    dependencyPhoneContactEmail:{//dependency_phone_contact_email varchar (100) NULL
      type: 'string',
      required: true,
      columnType: 'varchar(100)',
      columnName: 'dependency_phone_contact_email',
      maxLength: 100,
      isNotEmptyString:true,
      isEmail:true
    },
    dependencyPhoneContactActive : { // dependency_phone_contact_active tinyint(1) NOT NULL
      type: 'boolean',
      defaultsTo : true, 
      columnType: 'boolean',      
      columnName: 'dependency_phone_contact_active', 
    }
  }   
};