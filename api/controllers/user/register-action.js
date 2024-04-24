module.exports = 
{
  friendlyName: 'Register',
  description: 'Register user.',

  inputs: 
  {
    fullName: 
	{
      type: 'string',
      required: true,
    },
    email: 
	{
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: 
	{
      type: 'string',
      required: true,
      minLength: 6,
    },
  },

  exits: 
  {
    success: 
	{
      statusCode: 201,
      description: 'Nuevo usuario creado',
    },
    emailAlreadyInUse: 
	{
      statusCode: 400,
      description: 'El correo ya ha sido usado',
    },
    error: 
	{
      description: 'Error general',
    },
  },

  fn: async function (inputs, exits) 
  {
	try 
	{
	  const newEmailAddress = inputs.email.toLowerCase(); //minusculas     
	  const token = await sails.helpers.strings.random('url-friendly'); //token para autentificar correo
	  
	  let newUser = await User.create
	  ({
		userImage : "user_img/no-image.png",
		userFullName: inputs.fullName,
		userEmail: newEmailAddress,
		userPassword: inputs.password,
		userEmailProofToken: token,
		userEmailProofTokenExpiresAt:Date.now() + sails.config.custom.emailProofTokenTTL, //periodo de expiracion del token
	  }).fetch();
	  
	  const confirmLink = sails.config.custom.baseUrl+"/#/auth/verification?token="+token
	  
	  const email = 
	  {
		to: newUser.userEmail,
		subject: 'Confirma tu cuenta',
		template: 'confirm',
		context: 
		{
		  name: newUser.userFullName,
		  confirmLink: confirmLink,
		},
	  };

	  await sails.helpers.sendMail(email);

	  return exits.success
	  ({
		message: 'Una cuenta ha sido creada para el correo '+newUser.userEmail+' de forma exitosa. Revisa tu correo para verificar la cuenta.',
	  });
	  
	} 
	catch (error) 
	{
	  if (error.code === 'E_UNIQUE') 
	  {
		return exits.emailAlreadyInUse
		({
		  message: 'Ocurrió un error.',
		  error: 'La dirección de correo ya fue utilizada.',
		});
	  }
	  
	  return exits.error
	  ({
		message: 'Ocurrió un error',
		error: error.message,
	  });
	}
  },
};