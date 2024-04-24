module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add product file',
    inputs: 
      {
      quotationSaleTemplateQuotationSaleId: { 
        required: true,
        type:'ref',
      },
      quotationSaleTemplateName: { 
        required: true,
        type: 'string',
      },
      quotationSaleTemplateSize: { 
        required: true,
        type: 'ref',
      },
      quotationSaleTemplatePath: { 
        required: true,
        type: 'string',
      },
      
    },
      exits:
      { 
  
      success: 
          {
            statusCode: 201,
            description: 'Documento subido correctamente',
          },
          error: 
          {
            description: 'Error al subir archivo',
          },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            var createQuotationSaleTemplate =  await QuotationSaleTemplate.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createQuotationSaleTemplate.id
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