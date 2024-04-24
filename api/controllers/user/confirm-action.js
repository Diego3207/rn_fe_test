module.exports = {


  friendlyName: 'Confirm',
  description: 'Confirm user.',

  inputs: 
  {
    token: {
      type: 'string',
      description: 'El token de confirmación proporcionado por correo.',
      example: '4-32fad81jdaf$329',
    },
  },


  exits: 
  {
    success: {
      description: 'La confirmación del correo ha sido exitosa.',
    },
	
    invalidOrExpiredToken: 
	{
      statusCode: 400,
      description:
        'El token proporcionado esta expirad, es invalido o ya ha sido usado.',
    },
  },


  fn: async function (inputs, exits) 
  {
    //si no tiene un token se acaba el flujo
	if (!inputs.token) 
	{
      return exits.invalidOrExpiredToken
	  ({
        error: 'El token proporcionado esta expirad, es invalido o ya ha sido usado.',
      });
    }
	
	//busca el registro al que pertenece el token
    var user = await User.findOne({ userEmailProofToken: inputs.token });

	//el usuario no existe o el tiempo de expiracion del token es mas mayor que la fecha actual, se termina el fujo
    if (!user || user.userEmailProofTokenExpiresAt <= Date.now()) 
	{
      return exits.invalidOrExpiredToken
	  ({
        error: 'El token proporcionado esta expirad, es invalido o ya ha sido usado.',
      });
    }

	//si la cuenta no ha sido confirmada
    if (user.userEmailStatus === 'unconfirmed') 
	{
	  //se actualiza el status de la cuenta a confirmada, se borra el token de confirmacion y su tiempo de expiracion
	  await User.updateOne({ id: user.id }).set
	  ({
        userEmailStatus: 'confirmed',
        userEmailProofToken: '',
        userEmailProofTokenExpiresAt: 0,
      });
	  
	  //si todo sale bien se confirma la activacion 
      return exits.success
	  ({
        message: 'La confirmación del correo ha sido exitosa.',
      });
	  
	  //TODO se asume que no puede haber una cuenta no confirmada si el token ya fue borrado...

    }
  }


};