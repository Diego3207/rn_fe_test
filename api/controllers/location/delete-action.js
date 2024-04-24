
module.exports = {
    
    friendlyName: 'Delete',
      description: 'Delete location',
      
      
      
    inputs: 
      {   
      id: {  // location_id varchar(250)  NOT  NULL
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
          
      
          var update =  await Location.update({
              id: inputs.id
          }).set({
            locationActive: false
          });
          return exits.success
            ({           
              message: `Eliminado`,
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