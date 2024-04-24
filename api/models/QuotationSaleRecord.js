module.exports = 
{
tableName: "quotation_sale_records",
attributes: 
{
    id: { 
        type: 'string',   
        columnName : 'quotation_sale_record_id',
        columnType : 'integer',  
        autoIncrement: true,
    },

    quotationSaleRecordQuotationSaleId : {
        columnName: 'quotation_sale_record_quotation_sale_id',
        model:'quotationSale',
    },

    quotationSaleRecordSupplyId : {
        columnName: 'quotation_sale_record_supply_id',
        model:'supply',
    },

    quotationSaleRecordSaleOrderId : {
        columnName: 'quotation_sale_record_sale_order_id',
        model:'saleOrder',
    },   

    quotationSaleRecordProductId : {
        columnName: 'quotation_sale_record_product_id',
        model:'product',
    },   
    
    quotationSaleRecordActive: { 
        type: 'boolean',
        defaultsTo : true, 
        columnType: 'boolean',      
        columnName: 'quotation_sale_record_active', 
    },
    
  }
};
