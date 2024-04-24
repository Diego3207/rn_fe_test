module.exports = {
    //Types in model sails -> string / number / boolean / json / ref

  tableName: 'pay_methods',
  attributes: 
  { 
    id: 
    { 
      type: 'string',  
      columnName : 'id',
      columnType : 'integer',  
      autoIncrement: true,
    },

    payMethodKey: 
    { 
      type: 'string',  
      columnName : 'paymethod_key',
      columnType: 'varchar(100)',
    },

    payMethodValue: 
    { 
      type: 'string',  
      columnName : 'paymethod_value',
      columnType: 'varchar(100)', 
    },

    payMethodActive: 
    { 
      type: 'boolean',
      defaultsTo : true,
      columnType: 'boolean', 
      columnName: 'activo', 
    },

  },

};