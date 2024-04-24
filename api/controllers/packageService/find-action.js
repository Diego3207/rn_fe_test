
module.exports = {
    
  friendlyName: 'Find',
description: 'Find detail of package',
 
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


        var find =  await PackageService.findOne(inputs);

        
        

      

    
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