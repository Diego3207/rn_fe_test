
module.exports = {
    
  friendlyName: 'Find',
description: 'Find TrackerInstallation',
 
  inputs: 
{   
     id: { 
     
          type: 'number', 
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
      
      var find =  await TrackerInstallation.findOne(inputs)
      .populate('trackerInstallationAccessories',{
        where: {            
          trackerInstallationAccessoryActive: true,
         
        }
      })
      .populate('trackerInstallationEvidences', {
        where: {
          trackerInstallationEvidenceActive : true
        }
      })
      .populate('trackerInstallationCostumerId')
      .populate('trackerInstallationTrackerId')
      .populate('trackerInstallationInstallerId')
      .populate('trackerInstallationVehicleId');
    
      for(let i = 0 ; i < find['trackerInstallationEvidences'].length; i++)
		  {


          find['trackerInstallationEvidences'][i]['trackerInstallationEvidenceEvidenceInstallationId'] = 
          await EvidenceInstallation.findOne({ id: find['trackerInstallationEvidences'][i]['trackerInstallationEvidenceEvidenceInstallationId']});


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
              error: error.message,
          });
      }
  }
}