module.exports = {

    //Types in model sails -> string / number / boolean / json / ref

  tableName: 'costumer_data_banks',
  attributes: 
  { 

    id: { // costumer_data_bank_id int NOT NULL
        type: 'string', 
        columnName: 'costumer_data_bank_id',
        columnType: 'integer',
        autoIncrement: true,
    },
    
    costumerDataBankCostumerId: { //costumer_data_bank_costumer_id int  NOT NULL
        columnName: 'costumer_data_bank_costumer_id',
        model:'costumer',
    },

    costumerDataBankDataBankId: { //costumer_data_bank_data_bank_id int  NOT NULL
        columnName: 'costumer_data_bank_data_bank_id',
        model:'databank',
    },

    costumerDataBankActive : { // costumer_data_bank_active  inyint(1)   NOT NULL
        type: 'boolean',
        defaultsTo : true, // poner valor true (1) por default
        columnType: 'boolean',      
        columnName: 'costumer_data_bank_active', 
    }
  }   
};