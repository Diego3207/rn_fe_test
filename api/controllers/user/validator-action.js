const jwt = require('jsonwebtoken');

module.exports = {

  friendlyName: 'Validator action',
  description: 'Session and permission validation action',

  inputs: 
  {
	  module:
	  {
		  type:'string'
	  }
  },

  exits: 
  {
	success: 
	{
      description:'authentication token has been validated',
    },	
	invalidToken: 
	{
      statusCode: 401,
      description: 'The provided token is invalid or expired',
    },
	moduleNotFound: 
	{
      statusCode: 404,
      description: 'The provided module is not found',
    },
	forbiddenModule: 
	{
      statusCode: 403,
      description: 'The provided module is not found',
    },
  },


  fn: async function (inputs, exits) 
  {  
    try
	{
		//valida el token -------------------------------------------------------------------------------------------
		var tkn = this.req.headers['x-access-token']; //obtengo el token del header				
		var decoded = jwt.verify(tkn, sails.config.jwtSecret); //verifico el token
		
	
		//sails.log(decoded.sub);
		//valida el registro del usuario ------------------------------------------------------------------------------
		const user = await User.findOne
		({
                userEmail: decoded.sub
        });		
		if (!user || user.userActive == false) //si el usuario no existe, error 
		{
			return exits.invalidToken();
		}
		

		/*TODO checar si el modulo existe*/
		/* si el modulo no existe exits.moduleNotFound*/

		//valida el permiso al modulo ------------------------------------------------------------------------------------	
		const query = `select users.user_id, user_branches.user_branch_id, roles.role_name, modules.modules_name
					from users
					left join user_branches on user_branches.user_branch_user = users.user_id
					left join roles on roles.role_id =  user_branches.user_branch_role
					left join role_rights on role_rights.role_right_rol = roles.role_id
					left join modules on modules.modules_id = role_rights.role_right_module
					where users.user_email = $1 and modules.modules_name = $2`;
		const parameters = [decoded.sub, inputs.module];
		var rawResult = await User.getDatastore().sendNativeQuery(query, parameters);

		if(rawResult.rows.length==0)
		{
			//no tienes permiso de acceder al modulo
			return exits.forbiddenModule();
		}

	
		return exits.success({message:'ok'}); //si todo sale bien procede
		
	}
	catch (error)  //si ocurre un erro rechaza 
	{
		console.log(error);
		return exits.invalidToken({message:error});				
	}
  }


};