module.exports = {

    tableName: 'quotation_sale_templates',
    attributes: 
    { 
      
      id: { // quotation_sale_template_id int NOT NULL
        type: 'string', 
        columnName: 'quotation_sale_template_id',
        columnType: 'integer',
        autoIncrement: true,
      },
      quotationSaleTemplateQuotationSaleId: {  // quotation_sale_template_quotation_sale_id  INT  NULL
        columnName: 'quotation_sale_template_quotation_sale_id',
        model:'quotationSale',
      },
      quotationSaleTemplatePath: {  // quotation_sale_template_path varchar (255) NOT NULL
        columnName: 'quotation_sale_template_path',
        columnType: 'varchar(255)',
        type:'string'
      },
      quotationSaleTemplateSize: {  // quotation_sale_template_size INT NOT NULL
        columnName: 'quotation_sale_template_size',
        columnType: 'integer',
        type:'ref'
      },
      quotationSaleTemplateName: {  // quotation_sale_template_name varchar(255) INT NOT NULL
        columnName: 'quotation_sale_template_name',
        columnType: 'varchar(255)',
        type:'string'
      },
      quotationSaleTemplateActive : { // quotation_sale_template_active  tinyint(1) NOT NULL
        type: 'boolean',
        defaultsTo : true, // poner valor true (1) por default
        columnType: 'boolean',      
        columnName: 'quotation_sale_template_active', 
      },
    },
  }; 


  