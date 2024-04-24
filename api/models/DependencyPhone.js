module.exports = {

  tableName: 'dependency_phones',
  attributes: 
  { 

    id: { //dependency_phone_id int NOT NULL
      type: 'string', 
      columnName: 'dependency_phone_id',
      columnType: 'integer',
      autoIncrement: true,
    },   

    dependencyPhoneDependencyId: {  //dependency_phone_dependency_id INT NOT NULL
      columnName: 'dependency_phone_dependency_id',
      model:'dependency',
    },
    dependencyPhoneDependencyPhoneContactId: {  //dependency_phone_dependency_phone_contact_id INT NULL
      columnName: 'dependency_phone_dependency_phone_contact_id',
      model:'dependencyPhoneContact',
    },
    dependencyPhoneNumber : {  //dependency_phone_number varchar (15) NOT NULL
      type : 'string',
      columnName : 'dependency_phone_number',
      columnType : 'varchar(15)', 
      maxLength: 15,
      isNotEmptyString:true
    },
    dependencyPhoneExtension:{ //dependency_phone_extension varchar(150) NOT NULL
      type : 'string',
      columnName : 'dependency_phone_extension',
      columnType : 'varchar(150)', 
      allowNull: true
    },
    dependencyPhoneCommunicationChannel:{//dependency_phone_communication_channel varchar(150) NOT NULL
      type : 'string',
      columnName : 'dependency_phone_communication_channel',
      columnType : 'varchar(150)', 
      allowNull: true
    },
    dependencyPhoneActive:{ //dependency_phone_active tinyint(1) NOT NULL
      type: 'boolean',
      defaultsTo : true, 
      columnType: 'boolean',      
      columnName: 'dependency_phone_active', 
    }
  }   
};




  