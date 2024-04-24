/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

	emailProofTokenTTL: 24 * 60 * 60 * 1000, // tiempo de expiracion para proceso de validacion de correo, 24 horas
	passwordResetTokenTTL: 24 * 60 * 60 * 1000, // tiempo de expiracion para proceso de recuperacion de password, 24 hours
	baseUrl: 'https://adm.reportnow.com.mx', //url base para el link del correo
	filePath: '/opt/rn_files/',
};

