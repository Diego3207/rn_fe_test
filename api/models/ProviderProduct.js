module.exports = {

    //Types in model sails -> string / number / boolean / json / ref

  tableName: 'provider_products',
  attributes: 
  { 

    id: { // provider_product_id int NOT NULL
      type: 'string', 
      columnName: 'provider_product_id',
      columnType: 'integer',
      autoIncrement: true,
    },
    providerProductProviderId: { //provider_product_provider_id int  NOT NULL
      columnName: 'provider_product_provider_id',
      model:'provider',
    },
    providerProductProductId: {  //provider_product_product_id int  NOT NULLL
      columnName: 'provider_product_product_id',
      model:'product',
    },
    providerProductGuaranteeUnit: {  
      type: 'number',
      columnName: 'provider_product_guarantee_unit',
      columnType: 'integer',
    },
    providerProductGuaranteeUnitMeasure: {  
      type: 'string',
      columnName: 'provider_product_guarantee_unit_measure',
      columnType: 'varchar(100)',
    },
    providerProductGuaranteeSpecifications: {  
      type: 'string',
      columnName: 'provider_product_guarantee_specifications',
      columnType: 'varchar(250)',
    },
    providerProductActive : { // provider_product_active  inyint(1)   NOT NULL
      type: 'boolean',
      defaultsTo : true, // poner valor true (1) por default
      columnType: 'boolean',      
      columnName: 'provider_product_active', 
    }
  }   
};




  