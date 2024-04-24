module.exports = {

tableName: 'quotation_sale_commercial_terms',
attributes: 
{ 
  
  id: { // quotation_sale_commercial_term_id int NOT NULL
    type: 'string', 
    columnName: 'quotation_sale_commercial_term_id',
    columnType: 'integer',
    autoIncrement: true,
  },
  quotationSaleCommercialTermName: {  //quotation_sale_commercial_term_name varchar(255) TEXT NOT NULL
    columnName: 'quotation_sale_commercial_term_name', 
    type: 'string',
    required: true,
    columnType: 'varchar(255)',  
    isNotEmptyString:true
  },
  quotationSaleCommercialTermDescription: {  //quotation_sale_commercial_term_description TEXT NOT NULL
    columnName: 'quotation_sale_commercial_term_description', 
    type: 'string',
    required: true,
    columnType: 'text',  
    isNotEmptyString:true
  },
  quotationSaleCommercialTermActive: { // quotation_sale_commercial_term_active tinyint(1) NOT NULL
    type: 'boolean',
    defaultsTo : true,
    columnType: 'boolean', 
    columnName: 'quotation_sale_commercial_term_active', 
    
  },
  
},
/* beforeCreate: function(recordToCreate, proceed)
{
  recordToCreate['quotationDateRegister'] = new Date();
 
  return proceed();// esto es importante para que siga la operacion de crear registro
},
/* afterCreate: function(newlyCreatedRecord, proceed)
{
  console.log("afterCreate");
  return proceed();
},


beforeUpdate: function(valuesToSet, proceed)
{
  console.log("beforeUpdate");
  return proceed();
},
afterUpdate: function(updatedRecord, proceed)
{
  console.log("afterUpdate");
  return proceed();
},



beforeDestroy: function(criteria, proceed)
{
  console.log("beforeDestroy");
  return proceed();
},
afterDestroy: function(destroyedRecord, proceed)
{
  console.log("afterDestroy");
  return proceed();
},
*/
}; 