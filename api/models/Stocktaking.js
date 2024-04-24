module.exports = {
    //Types in model sails -> string / number / boolean / json / ref

    tableName: 'stocktakings',

    attributes: 
    { 
      id: 
      { 
        type: 'string',  
        columnName : 'stocktaking_id',
        columnType : 'integer',  
        autoIncrement: true,
      },
      stocktakingProductId: 
      { 
        type: 'ref', 
        columnType: 'integer',
        columnName: 'stocktaking_product_id',
      },
      stocktakingSupplyId:  
      { 
        type: 'ref', 
        columnType: 'integer',
        columnName: 'stocktaking_supply_id',
      },
      stocktakingLocationId: 
      { 
        type: 'ref', 
        columnType: 'integer',
        columnName: 'stocktaking_location_id',
      },
      stocktakingProductQuantity: 
      { 
        type: 'ref',  
        columnName : 'stocktaking_product_quantity',
        columnType: 'integer', 
      },
      stocktakingType: 
      { 
        type: 'string',  
        columnName : 'stocktaking_type',
        columnType: 'ENUM("in","out")', 
      },
      stocktakingActive: 
      { 
        type: 'boolean',
        defaultsTo : true,
        columnType: 'boolean', // se crea de esta type TINYINT(1)
        columnName: 'activo', 
      },
    },
  };