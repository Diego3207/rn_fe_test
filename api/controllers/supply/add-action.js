
module.exports = {
    
  friendlyName: 'Add',
description: 'add supplies',

  inputs: 
{   
  
  supplyProductId: {  
    type:'ref',
    required: true,
  },
  supplyPurchaseOrderId:{ 
    type:'ref',
    required: true,
  },
  supplySaleOrderId:{ 
    type:'ref',
    required: false,
  },
  supplyKey: {  
    type:'string',
    required: true,
  },
  supplyLocationId: {  
    type:'ref',
    required: true,
  },  
  supplyStatus: { 
    type:'string',
    required: false,    
  },
  supplyUserSuppliedId: { 
    type:'ref',
    required: true,
  }, 
  supplyDateSupplied:{ 
    type: 'ref',
    required: true,
   
 
  },
  supplyAssignedPersonId:{
    type: 'ref',
    required: true,
  },  
  supplyObservation:{ 
    type:'ref',
    required: false,
    
  },  
  
   
},

exits: 
{
  success: 
    {
      statusCode: 201,
      description: 'Registro creado correctamente',
    },
    keyAlreadyExists: 
    {
      statusCode: 400,
      description: 'El ID del suministro ya existe.',
    },
  error: 
    {
      statusCode: 500,
      description: 'Error general',
    },
  },
  fn: async function (inputs, exits) 
{
  // console.log(inputs);

    try {
      
      var create =  await Supply.create(inputs).fetch();

      return exits.success
      ({
          message: 'Registrado correctamente',
          newId: create.id
    });  
 
    }
    catch(error)
    {
      if (error.code === 'E_UNIQUE') 
      {
        return exits.keyAlreadyExists
        ({
          message: 'Ocurrió un error.',
          error: 'El ID del suministro ya existe.',
        });
      }
      
      return exits.error
      ({
        error: error.message,
      });
    }
  }
}