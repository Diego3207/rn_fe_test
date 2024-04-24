module.exports = 
{

  friendlyName: 'Download',
  description: 'Download file.',



  /*exits: {

    success: 
	{
      description: 'Login successful',
    },
    notAUser: 
	{
      statusCode: 404,
      description: 'User not found',
    },
    passwordMismatch: 
	{
      statusCode: 401,
      description: 'Password do not match',
    },
    operationalError: 
	{
      statusCode: 400,
      description: 'The request was formed properly'
    }
  },*/


  fn: async function (inputs, exits) 
  {	
		try 
		{					
			var SkipperDisk = require('skipper-disk');
			var fileAdapter = SkipperDisk();  

			this.res.set("Content-disposition", "attachment;");
			fileAdapter.read(sails.config.custom.filePath+this.req.query.id).
			on('error', function (err)
			{
				return exits.error(); //this.res.serverError(err);
			})
			.pipe(this.res);			
		} 
		catch (error) 
		{
		  console.error(error);
		  return exits.error();
		}
  }


};