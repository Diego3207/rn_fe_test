module.exports = {
    //Types in model sails -> string / number / boolean / json / ref
  tableName: 'cfdi',
  attributes: 
  { 
    id: 
    { 
      type: 'string',  
      columnName : 'id',
      columnType : 'integer',  
      autoIncrement: true,
    },

    cfdiKey: 
    { 
      type: 'string',  
      columnName : 'cfdi_key',
      columnType: 'varchar(100)',
    },

    cfdiValue: 
    { 
      type: 'string',  
      columnName : 'cfdi_value',
      columnType: 'varchar(100)', 
    },

    cfdiActive: 
    { 
      type: 'boolean',
      defaultsTo : true,
      columnType: 'boolean', 
      columnName: 'activo', 
    },

  },

};