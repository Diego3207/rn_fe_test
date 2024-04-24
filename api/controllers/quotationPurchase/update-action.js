module.exports = {
    
    friendlyName: 'Update',
	description: 'Update quotation of purchase',

    inputs: 
	{   
    id: { 
      type: 'number',
      required: true,
    },
    quotationPurchaseProviderId: { 
      type: 'ref',
      required: false,
    },

    quotationPurchaseDescription:{
      type: 'ref',
      required:false,
    },
    
    quotationPurchaseTimeDelivery: { 
      type: 'ref',
      required: false,
 
    },
    quotationPurchaseGuaranty: { 
      type: 'boolean',
      required: false, 
    },
    quotationPurchaseStatus: { 
      type:'string',
      required: false,
    },
    quotationPurchaseReasonStatus:{
      type:'ref',
      required: false,
    },
    quotationPurchaseDateStatus: {
      type: 'ref',
      required: false,
     
    },
  },
	exits: 
	{
    error: 
     {
        statusCode: 500,
        description: 'Error general',
     },
    },
    fn: async function (inputs, exits) 
	{
     //sails.log('Aqui ando');
      try {
        
        //falta actualizar fecha de estatus cuando el estatus cambie
        var update =  await QuotationPurchase.update({
              id: inputs.id
          }).set(_.omit (inputs , ['id']));
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