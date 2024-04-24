const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) 
{	
	try
	{
		var tkn = req.headers['token']; //obtengo el token del header		
		var decoded = jwt.verify(tkn, sails.config.jwtSecret); //verifico el token
		
		return proceed(); //si todo sale bien procede
		
	}
	catch (error)  //si ocurre un erro rechaza 
	{
		return res.status(401).json({ error:error });	
	}
};