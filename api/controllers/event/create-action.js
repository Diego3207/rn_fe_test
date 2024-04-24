module.exports = 
{

  friendlyName: 'Create',
  description: 'Create event.',

  inputs: 
  {

  },


  exits: 
  {	  
	invalid: 
	{
		statusCode: 409,
		description: 'Event create error'
	},

  },


  fn: async function (inputs, exits) 
  {
	  		
		//crea el registro de evento ------------------------------------------------------
		let nwevent = { description: 'Se registra un robo en casa habitacion' };				
		var evnt = await Event.create(nwevent).fetch();
		
		//crea el registro de ubicacion ---------------------------------------------------
		var ubic = await Adress.create({ description: 'Calle Piña #33'}).fetch();				
		await Event.update({id:evnt.id}).set({adress:ubic.id});
		
		//agrega etapas	----------------------------------------------------------------------
		var st1 = await Stage.create({ description: 'etapa inicio'}).fetch();
		var st2 = await Stage.create({ description: 'etapa despacho'}).fetch();				
		await Event.addToCollection(evnt.id, 'stages').members([st1.id, st2.id]); //<- esto agrega colecciones a un evento
		
		//agrega motivos --------------------------------------------------------------------
		var mot = await Motive.create({description:'Robo a mano armada'}).fetch();
		await Event.addToCollection(evnt.id, 'motives').members(mot.id); //<- esto llena la tabla evento_motivo
		
		//agrega un evento padre --------------------------------------------------------------
		var oldEvent = await Event.find( { 
				where :  {id: {'!=': evnt.id }} , 
				sort: 'id desc', 
				limit: 1 
			}); //trae el evento mas viejo que no sea el mismo		
				
		if(oldEvent.length !== 0)
			await Event.update({id:evnt.id}).set({parent_event:oldEvent[0].id});
		else
			sails.log("old event not found");
		

		if (!evnt) 
		{
			return exits.invalid
			({
				message: 'Error'
			});
		}
	   
		return exits.success
		({
			message: 'Event created.',
			data: evnt
		});
  }


};
