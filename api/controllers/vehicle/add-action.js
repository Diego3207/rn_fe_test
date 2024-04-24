module.exports = {
  friendlyName: 'Add',
	description: 'Add Vehicle.',
  inputs: 
	{
    vehicleCostumerId:{
      type: 'ref',
      required : true
    },
    vehicleBrand:
    {
      type: 'string',
      required: true, 
    },
    vehicleModel: 
    {
      type: 'string',
      required: true, 
    },
    vehicleYear: 
    {
      type: 'string',
      required: true, 
    },
    vehicleVin: 
    {
      type: 'string',
      required: true,
    },
    vehiclePlateNumber: 
    {
      type: 'string',
      required: true,
    },
    vehicleColor: 
    {
      type: 'string',
      required: true,
    }

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
          var createVehicle =  await Vehicle.create(inputs).fetch();
          return exits.success
          ({
              message: 'Registrado correctamente',
              newId: createVehicle.id
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