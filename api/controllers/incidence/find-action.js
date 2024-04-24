
module.exports = {
    
    friendlyName: 'Find',
	description: 'Find incidence',
    
    
    
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
        
      var find =  await Incidence.findOne(inputs)
      
      .populate('incidenceInvolvedDevices',{
        where: {
          incidenceInvolvedDeviceActive: true
        }
      })
      .populate('incidenceCostumerId')
      .populate('incidenceEvidences',{
              where: {
                incidenceEvidenceActive: true
              }
      })
      .populate('incidenceCoordinations',{
        where: {
          incidenceCoordinationActive: true
        }
});
      

      
    for (var i = 0; i < find['incidenceInvolvedDevices'].length; i++) 
      {
        var device = await IncidenceBackDevice.findOne({ id: find['incidenceInvolvedDevices'][i].incidenceInvolvedDeviceIncidenceBackDeviceId      }); 
          
          find['incidenceInvolvedDevices'][i].incidenceInvolvedDeviceIncidenceBackDeviceId  = device ;



      }


      

      
      if (!find) {
        return exits.errorEmpty({
          message: 'Sin coincidencia',
           
        }); 
      }
      else {
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