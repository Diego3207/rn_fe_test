
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update Vehicle',
    
    
    
    inputs: 
	{   
    id: {  
      type: 'number',
      required: true,
    },
    vehicleCostumerId:{
      type: 'ref',
      required : true
    },
    vehicleBrand:
    {
      type: 'string',
      required: false, 
    },
    vehicleModel: 
    {
      type: 'string',
      required: false, 
    },
    vehicleYear: 
    {
      type: 'string',
      required: false, 
    },
    vehicleVin: 
    {
      type: 'string',
      required: false,
    },
    vehiclePlateNumber: 
    {
      type: 'string',
      required: false,
    },
    vehicleColor: 
    {
      type: 'string',
      required: false,
    }
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
      try {
        
        var update =  await Vehicle.update({
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
                error: error.message,
            });
        }
    }
}