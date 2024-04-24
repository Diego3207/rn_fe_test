
module.exports = {
    
    friendlyName: 'Delete',
      description: 'Delete AssociationTrackerService',
      
      
      
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
            statusCode: 300,
            description: 'Error general',
          },
          
      },
      fn: async function (inputs, exits) 
      {
      
        try {
          
      
          var update =  await AssociationTrackerService.update({
              id: inputs.id
          }).set({
            associationTrackerServiceActive: false
          });
          return exits.success
            ({           
              message: `Eliminado`,
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