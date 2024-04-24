module.exports = 
{
  friendlyName: 'Delete',
  description: 'Delete Permanent File',

  inputs: 
    {   
    file: {  
      type: 'string',
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
      errorNonExists: 
      {
        statusCode: 400,
        description: 'No such file or directory',
      },
  },
  fn: async function (inputs, exits) 
  {


    try {
      const file = inputs.file;
      const path = "/opt/rn_files/";
      const fs = require('fs'); 
      
			fs.unlink(path + file, (err) => { 
        if (err) return exits.errorNonExists({
          message: 'El fichero o directorio no existe ' + err,
        });
        return exits.success
        ({           
          message: 'Eliminado permanente',
        }); 
      });
		} catch(error){
        return exits.error
          ({
            //message: `Error logging in user ${inputs.email}`,
            error: error.message,
          });
    }
  }
};

