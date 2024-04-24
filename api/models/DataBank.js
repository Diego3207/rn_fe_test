module.exports = {

    //Types in model sails -> string / number / boolean / json / ref

    tableName: 'data_banks',
    attributes:
    {

        id: { 
            type: 'string',
            columnName: 'data_bank_id',
            columnType: 'integer',
            autoIncrement: true,
        },

        dataBankBeneficiaryName: {  
            type: 'string',
            required: true,
            columnType: 'varchar(100)',
            columnName: 'data_bank_name',
            maxLength: 100,
            isNotEmptyString: true
        },

        dataBankInstitutionName: {  
            type: 'string',
            required: true,
            columnType: 'varchar(100)',
            columnName: 'data_bank_institution_name',
            maxLength: 100,
            isNotEmptyString: true
        },

        dataBankType: {
            type: 'string',
            required: true,
            columnType: 'ENUM("account","clabe","card")', 
            columnName: 'data_bank_type_account',
            isNotEmptyString: true
        },

        dataBankNumber: {  
            type: 'string',
            required: true,
            columnType: 'varchar(100)',
            columnName: 'data_bank_number',
            isNotEmptyString: true
        },

        dataBankPlayer: {
            type: 'string',
            required: true,
            columnType: 'ENUM("costumer","provider","owner")', 
            columnName: 'data_bank_player',
            isNotEmptyString: true
        },

        dataBankActive: { // data_bank_active  inyint(1)   NOT NULL
            type: 'boolean',
            defaultsTo: true, // poner valor true (1) por default
            columnType: 'boolean',
            columnName: 'data_bank_active',
        },
    }
};