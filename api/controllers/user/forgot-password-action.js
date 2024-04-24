module.exports = 
{
  friendlyName: 'Forgot password',
  description: '',

  inputs: 
  {
    email: 
	{
      description: 'El correo de la cuenta que intenta recuperar el password.',
      example: 'albus@dumbledore.com',
      type: 'string',
      required: true,
    },
  },

  exits: 
  {
    success: 
	{
      description:
        'El correo electrónico es valido y un correo de recuperación ha sido enviado.',
    },
	noUser: 
	{	statusCode: 400,
		description: 'Usuario no encontrado',
    }
  },

  fn: async function (inputs, exits) 
  {
    var user = await User.findOne({ userEmail: inputs.email });
    
	if (!user) 
	{
      return exits.noUser
	  ({
          message: 'Error',
          error: 'El usuario no existe',
	  });
    }
    
	const token = await sails.helpers.strings.random('url-friendly'); // genera token para recuperar contraseña 


    await User.update({ id: user.id }).set
	({
      userPasswordResetToken: token,
      userPasswordResetTokenExpiresAt:Date.now() + sails.config.custom.passwordResetTokenTTL,
    });
    
	
    const email = 
	{
      to: user.userEmail,
      subject: 'Reset Password',
      template: 'forgot-password',
      context: 
	  {
        name: user.userFullName,
        token: token,
      },
    };
	
    try 
	{
      await sails.helpers.sendMail(email);
    } catch (error) 
	{
      sails.log(error);
    }


    return exits.success({
      message: `El correo de recuperación se ha enviado a  ${user.userEmail}.`,
    });


  },
};