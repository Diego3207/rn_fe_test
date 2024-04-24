
module.exports = {
    
  friendlyName: 'Find',
description: 'Find purcharse order',
 
  inputs: 
{   
     id: { 
     
          type: 'number', //number
          required: true,
       },
  },
exits: 
{
    error: 
      {
        statusCode: 500,
        description: 'Error general',
      },
      errorEmpty: 
      {
        statusCode: 204,
        description: 'Sin coincidencia',
      },
      
  },
  fn: async function (inputs, exits) 
{
    try {
      
      var find =  await PurchaseOrder.findOne(inputs)
      //.populate('productCategoryId')
      .populate('purchaseOrderProviderId')
      .populate('purchaseOrderQuotationPurchaseId')
      .populate('purchaseOrderProducts', {
        where: {
          purchaseOrderProductActive: true
        }
      })
      .populate('purchaseOrderServices', {
        where: {
          purchaseOrderServiceActive: true
        }
      })
      .populate('purchaseOrderEvidences', {
        where: {
          purchaseOrderEvidenceActive : true
        }
      });

      for (var i = 0; i < find['purchaseOrderProducts'].length; i++) 
      {

        var product = await Product.findOne({ id: find['purchaseOrderProducts'][i].purchaseOrderProductProductId , productActive: true }); 
        
        find['purchaseOrderProducts'][i].purchaseOrderProductProductId  = product;
        //find['purchaseOrderProducts'][i].purchaseOrderProductPendingQuantity = ''; 
        
        find['purchaseOrderProducts'][i].purchaseOrderProductSupplies = await Supply.find({ supplyPurchaseOrderId: find.id, supplyProductId: find['purchaseOrderProducts'][i]['purchaseOrderProductProductId'].id, supplyActive: true }); ; 
        


      }
      
      //procesar tambien los servicios
      for (var i = 0; i < find['purchaseOrderServices'].length; i++) 
      {

        var service = await Service.findOne({ id: find['purchaseOrderServices'][i].purchaseOrderServiceServiceId , serviceActive: true }); 
        find['purchaseOrderServices'][i].purchaseOrderServiceServiceId  = service;
      }

     

      //find.purchaseOrderSupplies =  await Supply.find({ supplyPurchaseOrderId: find.id, supplyActive: true }); 
    
      if (!find) {
        //console.log('no');
        return exits.errorEmpty({
          message: 'Sin coincidencia',
           
        }); 
      }
      else {
        //console.log('ok');
        return exits.success(find); 
      }
     
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