module.exports = {
    //Types in model sails -> string / number / boolean / json / ref

  tableName: 'products',
  attributes: 
  { 

    id: 
    { 
      type: 'string',  
      columnName : 'id',
      columnType : 'integer',  
      autoIncrement: true,
    },

    productBrand: 
    { 
      type: 'string',  
      columnName : 'product_brand',
      columnType: 'varchar(100)',
    },

    productModel: 
    { 
      type: 'string',  
      columnName : 'product_model',
      columnType: 'varchar(100)', 
    },

    productCategoryId: { 
      columnName: 'product_product_category_id',
      model:'productCategory',
   },

    productDescription: 
    { 
      type: 'string',  
      columnName : 'product_description',
      columnType: 'text',  
    },

    productPrice:
    {
      type: 'ref',//se pone en ref para que pueda filtrar con el match `contains`
      required: true,
      columnType: 'double(12,2)', 
      columnName: 'product_price', 
      max:999999999999.00,
      isNumber: true
    },

    productGuaranteeUnit: {  
      type: 'number',
      columnName: 'product_guarantee_unit',
      columnType: 'integer',
      required: false,
    },

    productGuaranteeUnitMeasure: {  
      type: 'string',
      columnName: 'product_guarantee_unit_measure',
      columnType: 'varchar(100)',
      required: false,
    },

    productGuaranteeSpecifications: {  
      type: 'string',
      columnName: 'product_guarantee_specifications',
      columnType: 'varchar(250)',
      required: false,
    },

    productAsset: 
    { 
      type: 'string',  
      columnName : 'product_asset',
      columnType: 'ENUM("fijo","circulante")', 
    },

    productFile: //coleccion de ProductsFiles
    {
      collection: 'productfile', 
      via: 'productFileProductId'  
    },

    productActive: 
    { 
      type: 'boolean',
      defaultsTo : true,
      columnType: 'boolean', 
      columnName: 'product_active', 
    },

  },

};