/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
                                                                            
   Default policy for all controllers and actions, unless overridden.       
   (`true` allows public access)                                            
      
	UserController: {
		// By default, require requests to come from a logged-in user  (runs the policy in api/policies/isLoggedIn.js)
		'*': 'isLoggedIn',

		// Only allow admin users to delete other users (runs the policy in api/policies/isAdmin.js)
		'delete': 'isAdmin',

		// Allow anyone to access the login action, even if they're not logged in.
		'login': true
	}                                                                       
  ***************************************************************************/

	'/*': true, //acceso publico a todo

	//'event/*' : 'auth-pol', //todas las acciones de la carpeta event estan sujetas a la auentificacion 
	
	//'user/login-action': 'can-login-pol', //manda llamar la politica de condiciones de login para las siguientes acciones 
	//'user/forgot-password-action': 'can-login-pol',
	
	
	//'getEncryptedData': ['isLoggedIn', 'isInValidRegion'] //aplica mutiples politicas
};
