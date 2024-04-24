
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update SaleOrder',
    
  inputs: 
	{   
    id: { 
      type: 'number',
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
    saleOrderDate: { 
      required: false,
      type: 'ref',
    },
    saleOrderShippingDate: { 
      required: false,
      type: 'ref',
    }, 
    saleOrderShippingAddress: { 
      type: 'string',
      required: false,
    },
    saleOrderAdditionalComments: {
      type: 'ref',
      required: false, 
    },
    saleOrderStatus: { 
      type:'string',
      required: false,
    },
    saleOrderTransmitter: { 
      type: 'ref',
      required: false,
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
        
    var update =  await SaleOrder.update
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