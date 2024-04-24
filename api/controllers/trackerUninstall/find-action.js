
module.exports = {
    
  friendlyName: 'Find',
description: 'Find Evidence of  tracker installation',
 
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
      
      var find =  await TrackerUninstall.findOne(inputs)

      .populate('trackerUninstallEvidences', {
        where: {
          trackerUninstallEvidenceActive : true
        }
      });
   
      for(let i = 0 ; i < find['trackerUninstallEvidences'].length; i++)
		  {
          find['trackerUninstallEvidences'][i]['trackerUninstallEvidenceEvidenceInstallationId'] =
          await EvidenceInstallation.findOne({ id: find['trackerUninstallEvidences'][i]['trackerUninstallEvidenceEvidenceInstallationId']});


      }
    
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