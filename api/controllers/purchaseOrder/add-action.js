
module.exports = {
  // npm install sails-mysql
  friendlyName: 'Lote',
	description: 'Create purchase order.',
  inputs: 
	{
    purchaseOrderDescription: {  
      type: 'ref',
      required: true,
    },
    purchaseOrderProviderId: {  // purchase_order_provider_id INT  NULL
      type:'string', //debe ser sttring/ref ya que asi esta en el modelo y el atributo hace referencia al modelo
      required: true,
    },
   
    purchaseOrderQuotationPurchaseId: {  //purchase_order_quotation_id  INT  NULL
      type:'string', //debe ser sttring/ref ya que asi esta en el modelo y el atributo hace referencia al modelo
      required: false,
    },
    purchaseOrderGuaranty: { // purchase_order_guaranty  TINYINT(1)  NOT NULL
      type:'boolean',
      required:false
    },
  },
  exits:
	{ 

    success: 
      {
        statusCode: 201,
        description: 'Registro creado correctamente',
      },
    error: 
      {
        statusCode: 500,
        description: 'Error general',
      },
  },
  fn: async function (inputs, exits) 
	{
        try {
          var data = {};
          inputs['purchaseOrderStatus'] = 'nueva';    
          inputs['purchaseOrderDateStatus'] = new Date();   
           
          var create =  await PurchaseOrder.create(inputs).fetch();

         
          return exits.success
          ({
              message: 'Registrado correctamente',
              newId: create.id
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