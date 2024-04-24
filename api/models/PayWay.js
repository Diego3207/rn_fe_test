module.exports = {
    //Types in model sails -> string / number / boolean / json / ref

  tableName: 'pay_ways',
  attributes: 
  { 
    id: 
    { 
      type: 'string',  
      columnName : 'id',
      columnType : 'integer',  
      autoIncrement: true,
    },

    payWayKey: 
    { 
      type: 'string',  
      columnName : 'payway_key',
      columnType: 'varchar(100)',
    },

    payWayValue: 
    { 
      type: 'string',  
      columnName : 'payway_value',
      columnType: 'varchar(100)', 
    },

    payWayActive: 
    { 
      type: 'boolean',
      defaultsTo : true,
      columnType: 'boolean', 
      columnName: 'activo', 
    },

  },

};