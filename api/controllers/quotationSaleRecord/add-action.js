module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add QuotationSaleRecord.',
    inputs: 
      {      
        quotationSaleRecordQuotationSaleId : { 
          type:'ref',
          required: true
        },

        quotationSaleRecordSupplyId: { 
          type:'ref',
          required: false
        },

        quotationSaleRecordSaleOrderId: { 
          type:'ref',
          required: false
        },

        quotationSaleRecordProductId: { 
          type:'ref',
          required: true
        }
      },
      exits:
      { 
        success: 
        {
          statusCode: 201,
          description: 'Dispositivo registrado correctamente',
        },
        error: 
        {
          statusCode: 500,
          description: 'Error al registrar Dispositivo',
        },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            var createQuotationSaleRecord =  await QuotationSaleRecord.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createQuotationSaleRecord.id
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