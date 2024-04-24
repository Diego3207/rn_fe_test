module.exports = {

  tableName: 'sim_cards',
  attributes: 
  { 
    id: { 
      type: 'string', 
      columnName: 'sim_card_id',
      columnType: 'integer',
      autoIncrement: true, 
    }, 

    simCardSupplyId: { 
      columnName: 'sim_card_supply_id', 
      model:'supply',
      unique: true,
    }, 

    simCardNumber: { 
      type: 'string',
      required: true,
      columnType: 'varchar(15)',
      maxLength: 15,
      columnName: 'sim_card_number', 
      unique: true,
    },

    simCardRecoveryCode: { 
      type: 'string',
      required: false,
      columnType: 'varchar(12)',
      maxLength: 12,
      columnName: 'sim_card_recovery_code', 
    }, 

    simCardTsp: { 
      type: 'string',
      required: true,
      columnType: 'varchar(150)',
      maxLength: 150,
      columnName: 'sim_card_tsp', 
    }, 

    simCardPin: { 
      type: 'string',
      required: false,
      columnType: 'varchar(4)',
      maxLength: 4,
      columnName: 'sim_card_pin', 
    }, 

    simCardPuk: { 
      type: 'string',
      required: false,
      columnType: 'varchar(8)',
      maxLength: 8,
      columnName: 'sim_card_puk', 
    }, 

    simCardServicePlan: { 
      type: 'string',
      required: true,
      columnType: 'varchar(150)',
      maxLength: 150,
      columnName: 'sim_card_service_plan', 
    }, 

    simCardStatus: { 
      type:'string',
      required: true,
      isIn: ["activada","desactivada","disponible"],
      columnType: 'ENUM("activada","desactivada","disponible")',
      columnName: 'sim_card_status', 
    },

    simCardActive: { 
      type: 'boolean',
      defaultsTo : true,
      columnType: 'boolean', 
      columnName: 'sim_card_active', 
    },
  },
}; 