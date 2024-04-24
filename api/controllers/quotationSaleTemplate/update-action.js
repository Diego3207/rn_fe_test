
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update product File',
    
  inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },
    quotationSaleTemplatequotationSaleId: { 
      required: false,
      type:'ref',
    },
    quotationSaleTemplateName: { 
      required: false,
      type: 'string',
    },
    quotationSaleTemplateSize: { 
      required: false,
      type: 'ref',
    },
    quotationSaleTemplatePath: { 
      required: false,
      type: 'string',
    },
 },
	exits: 
	{
      error: 
        {
          statusCode: 300,
          description: 'Error general',
        },
      errorEmpty: 
      {
        statusCode: 301,
        description: 'Campos vacios',
      },
    },
    fn: async function (inputs, exits) 
	{
    
    try {
        
      var update =  await QuotationSaleTemplate.update
        ({
            id: inputs.id
        }).set(_.omit(inputs, ['id']));
        return exits.success
          ({           
            message: `Actualizado`,
          }); 
       
      }
      catch(error){
            return exits.error
            ({
                //message: `Error logging in user ${inputs.email}`,
                error: error.message,
            });
        }
    }
}