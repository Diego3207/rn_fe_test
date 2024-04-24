module.exports = async function (req, res, proceed) 
{
  const { email } = req.allParams(); //obtiene el parametro de correo
  try 
  {
    const user = await User.findOne({ email: email }); //encunetra la cuenta de usuario
    
	if (!user)  //la cuenta de usuario no existe
	{
      res.status(404).json({
        error: `${email} does not belong to a user`,
      });
    } 
	else if (user.emailStatus === 'unconfirmed') //la cuenta no ha sido corroborada por el correo electronico 
	{
      res.status(401).json({
        error: 'This account has not been confirmed. Click on the link in the email sent to you to confirm.',
      });
    } else 
	{
      return proceed(); //continua con la ejecucion
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};