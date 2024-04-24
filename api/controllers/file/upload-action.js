module.exports = 
{

  friendlyName: 'Upload',
  description: 'Upload file.',


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
			
			//console.log(this.req.param('path')); 		
			dir = this.req.param('path'); //directorio parametro del usuario
			
			this.req.file('file').upload
			( 
				{					
					maxBytes: 20000000 ,// don't allow the total upload size to exceed ~20MB
					dirname: require('path').resolve(sails.config.custom.filePath,dir), //(sails.config.appPath, 'assets/images')
					//saveAs : 'av.png' genera un guid para el archivo
				},			
			
				function(err, files) 
				{
					if (err) 
					{
						return exits.error();//this.res.serverError(err);
					}
					
					if (files.length === 0)
					{
						return exits.error();//this.res.badRequest('No file was uploaded');
					}
					
					files.forEach((currentElement, index) => { currentElement.fd = dir+'/'+files[0].fd.split('/').pop(); });
					
					return exits.success
					({
						message: files.length + ' file(s) uploaded successfully!',
						files: files,//dir+'/'+files[0].fd.split('/').pop(), //files
					})
				}
			);			
		} 
		catch (error) 
		{
		  console.error(error);
		  return exits.error();
		}
  }


};