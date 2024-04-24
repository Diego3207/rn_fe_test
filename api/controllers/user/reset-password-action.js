module.exports = 
{
  friendlyName: 'Reset password',
  description: '',

  inputs: 
  {
    password: 
	{
      description: 'Nuevo password.',
      example: 'myfancypassword',
      required: true,
    },
    token: 
	{
      description:'Token para reestablecer el password',
      example: 'gwa8gs8hgw9h2g9hg29',
      required: true,
    },
  },

  exits: 
  {
    success: 
	{
      description:
        'La contraseña ha sido reestablecida.',
    },
    invalidToken: 
	{
      statusCode: 401,
      description:
        'El token no es válido, ha expirado o ya ha sido usado.',
    },
  },

  fn: async function (inputs, exits) 
  {

    if (!inputs.token) 
	{
      return exits.invalidToken
	  ({
        error: 'El token es invalido o a expirado',
      });
    }
	
    var user = await User.findOne({ userPasswordResetToken: inputs.token });

    if (!user || user.userPasswordResetTokenExpiresAt <= Date.now()) 
	{
      return exits.invalidToken
	  ({
        error: 'Your reset token is either invalid or expired',
      });
    }


    const hashedPassword = await sails.helpers.passwords.hashPassword(inputs.password);

    await User.updateOne({ id: user.id }).set({
      userPassword: hashedPassword,
      userPasswordResetToken: '',
      userPasswordResetTokenExpiresAt: 0,
    });

    this.req.user = user;
    
	return exits.success
	({
      message: `Contraseña recuperada exitosamente para ${user.email}`,
      data: user,
    });
  },
};