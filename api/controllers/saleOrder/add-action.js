module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add purchase sale',
    inputs: 
      {
        saleOrderQuotationSaleId: {  
          type: 'ref',
          required: true,
        },
        saleOrderCfdiId: {  
          type: 'ref',
          required: false,
        }, 
        saleOrderPayWayId: {  
          type: 'ref',
          required: false,
        }, 
        saleOrderPayMethodId: {  
          type: 'ref',
          required: false,
        }, 
        saleOrderShippingDate: { 
          required: false,
          type: 'ref',
        }, 
        saleOrderShippingAddress: { 
          type: 'ref',
          required: false,
        },
        saleOrderAdditionalComments: {
          type: 'ref',
          required: false, 
        },
        saleOrderTransmitter: { 
          type: 'ref',
          required: true,
        },
    },
      exits:
      { 
  
      success: 
          {
            statusCode: 201,
            description: 'Orden de venta creada correctamente',
          },
          error: 
          {
            description: 'Error al crear Orden de venta',
          },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            inputs['saleOrderStatus'] = 'nueva';   
            inputs['saleOrderDate'] = new Date();

            var createSaleOrder =  await SaleOrder.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createSaleOrder.id
            });  
       
          }
          catch(error){
              return exits.error
              ({
                  message: `Error `,
                  error: error.message,
              });
          }
      }
  }