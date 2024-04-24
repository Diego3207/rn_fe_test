
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update Purchase order',

    inputs: 
	{   
    id: {  // purchase_order_id INT NOT  NULL
      type: 'number',
      required: true,
    },
    purchaseOrderDescription: {  
      type: 'ref',
      required: false,
    },
    purchaseOrderQuotationPurchaseId: {  //purchase_order_quotation_id  INT  NULL
      type:'ref',
      required:false
    },
    purchaseOrderProviderId: {  // purchase_order_provider_id INT  NULL
      type:'ref',
      required:false
    },
    purchaseOrderGuaranty: { // purchase_order_guaranty  TINYINT(1)  NOT NULL
      type:'boolean',
      required:false
    },
    purchaseOrderStatus: { // purchase_order_status ENUM("nueva","abastesida","pendiente")
      type:'string',
      required:false
    },
    purchaseOrderUserReceivedId:{ //purchase_order_userReceivedId INT NOT NULL
      type:'ref',
      required:false

    },
    purchaseOrderDateStatus: {// purchase_order_date_status DATEtime    NOT NULL
      type: 'ref',
      required: false,
    },
    purchaseOrderStatusObservation: {// purchase_order_statusObservation TEXT
      type:'string',
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
        
        //sails.log(inputs);
        var update =  await PurchaseOrder.update({
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