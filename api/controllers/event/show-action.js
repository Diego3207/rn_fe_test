module.exports = {

	friendlyName: 'Show',
	description: 'Show events.',

	inputs: 
	{
		//https://sailsjs.com/documentation/concepts/models-and-orm/attributes
		idEvento: 
		{
		
		//**atributos de documentacion 
			friendlyName: 'id del evento',
			description: 'id del usuario',
			extendedDescription: 'id auto generado de la base de datos',
			whereToGet: {description: 'el id de usuario solo es maniupulado por medio del webservice o la interface de usuario'},
			example: 1,
			
		//**atributos de definicion
			type: 'number', //string, number, boolean, json, ref
			//defaultsTo: 0,
			
		//**atributos de validacion  https://sailsjs.com/documentation/concepts/models-and-orm/validations
			//isIn: ['boring', 'too many emails', 'recipes too difficult', 'other'],
			//allowNull: true,
			//isEmail: true,
			required: true,			 
			
		},
	},
  
	exits:
	{
		//responseType	
		//	success
		//	redirect
		//	badRequest
		//	forbidden
		//	notFound
		//	serverError		
		//	view
		
		error:
		{
			statusCode: 500,
			description: 'Error',
		}
		
	},

	fn: async function (inputs, exits) 
	{
		//this.req accedes al request 	
		try
		{
			
			var evnt = await Event.find({id:inputs.idEvento}).populate('adress').populate('stages').populate('motives').populate('parent_event');	

			return exits.success
			({
				message: 'Eventos encontrados',
				data: evnt
			});
		
		}catch (error) 
		{
			return exits.error({error:error});
		}

		//---------------------------------------------------
			//this.res.set('content-type', 'text/html; charset=ISO-8859-1'); //se supone que cambia el charset, no funciona
			//this.res.set('content-type', 'text/plain'); //cambia el formato de respuesta
		
			//this.res.sendStatus(403); //<!-- esta forma de respuesta es de express, forma nativa
			//this.res.status(400).send('Custom message'); // <!-- manda mensaje custom
		
			//this.res.json({ dato: 'tést' }); //<!--responde un json
		
			//return this.res.send('Hi there!'); //<!-- el ejecutar el return garantiza que el codigo no continuara ejecutandose aunque ya tenga una respuesta
			
			
			//throw 'notok'; //<!- ejecuta una de las salidas por su nombre y termina la ejecucion, como poner return exit..
			
			//return exits.notok({mensaje:'un mensaje'}); //aparte de la definicion de mensaje, puedo mandar parametros
		
		
		//-------------------------------------------------------------
		
		
			//this.res.attachment("nuevo.txt"); //<- nombre del archivo que se descargara
			//var downloading = await this.sails.startDownload("/var/tmp/hola.txt"); //<!-- ruta del archivo a descargar
			//return exits.success(downloading); //<!-- ejecuta la descarga y el fin de la ejecucion
		 
		//------------------------------
		
		
		/*var dstore = sails.getDatastore('local2'); //<- obtienes un datastore diferente al default, sql solo aplica con bases de datos relacionales
		var rawResult = await dstore.sendNativeQuery("select 'hola' as result");
		console.log(rawResult.rows[0].result);*/
	
	}

};