
module.exports = {
    
  friendlyName: 'Find',
description: 'Find review for installation',
 
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
      
      var find =  await TrackerInstallationReview.findOne(inputs)
      .populate('trackerInstallationReviewEvidences', {
        where: {
          trackerInstallationReviewEvidenceActive : true
        }
      });
   
      for(let i = 0 ; i < find['trackerInstallationReviewEvidences'].length; i++)
		  {
          find['trackerInstallationReviewEvidences'][i]['trackerInstallationReviewEvidenceEvidenceInstallationId'] =
          await EvidenceInstallation.findOne({ id: find['trackerInstallationReviewEvidences'][i]['trackerInstallationReviewEvidenceEvidenceInstallationId']});


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