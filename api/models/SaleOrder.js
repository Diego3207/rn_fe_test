module.exports = {

    tableName: 'sale_orders',
    attributes: 
    { 
      id: { 
        type: 'string', 
        columnName: 'sale_order_id',
        columnType: 'integer',
        autoIncrement: true, 
      }, 
      
      saleOrderDate: { 
        type: 'ref',
        required: true,
        columnType: 'DATETIME', 
        columnName: 'sale_order_date',  
      },

      saleOrderShippingDate: { 
        type: 'string',
        required: false,
        columnType: 'DATETIME', 
        columnName: 'sale_order_shipping_date', 
        allowNull: true,   
      }, 

      saleOrderShippingAddress: { 
        type: 'string',
        required: false,
        columnType: 'varchar(250)',
        columnName: 'costumer_address',
        maxLength: 250,
        columnName: 'sale_order_shipping_address', 
        allowNull: true,  
      },

      saleOrderQuotationSaleId: {  
        columnName: 'sale_order_quotation_sale_id', 
        model:'quotationSale',
      }, 

      saleOrderCfdiId: {  
        columnName: 'sale_order_cfdi_id', 
        model:'cfdi',
      }, 

      saleOrderPayWayId: {  
        columnName: 'sale_order_pay_way_id', 
        model:'payWay',
      }, 

      saleOrderPayMethodId: {  
        columnName: 'sale_order_pay_method_id', 
        model:'payMethod',
      }, 

      saleOrderAdditionalComments: { 
        type:'string',
        required: false,
        columnType:'text',
        columnName: 'sale_order_commercial_terms', 
        allowNull: true
      },

      saleOrderTransmitter: {
        columnName: 'sale_order_transmitter', 
        model:'user',
      },

      saleOrderSupplies: {
        collection: 'supply', 
        via: 'supplySaleOrderId'  
	    },

      saleOrderStatus: {
        type:'string',
        required: true,
        isIn: ["nueva","pendiente","terminada"],
        columnType: 'ENUM("nueva","pendiente","terminada")',
        columnName: 'sale_order_status', 
      },
      
      saleOrderActive: { 
        type: 'boolean',
        defaultsTo : true,
        columnType: 'boolean', 
        columnName: 'sale_order_active', 
      },
    },
  }; 