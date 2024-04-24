module.exports = 
{

  friendlyName: 'List',
  description: 'List of users.',


  inputs: 
  {
	filters:
	{
		type: 'json',
	},
	limit: 
	{
	  type: 'number',
	  required: true,
	},
	page: 
	{
	  type: 'number',
	  required: true,
	},
	sort: 
	{
	  type: 'json',
	  required: true,
	},
  },


  exits: 
  {
	error: 
	{
	  statusCode: 500,
	  description: 'Error general',
	},
	errorEmpty: 
	{
	  statusCode: 204,
	  description: 'Sin coincidencias',
	},
	errorRangoPage: 
	{
		statusCode: 400,
		description: 'Valor exceden el rango permitido ',
	}
  },


  fn: async function (inputs, exits) 
  {
        try 
		{
			// prepara la seccion de filtros
            let filters = {};   
			let sort = await sails.helpers.processSort(inputs.sort);

            if(inputs.filters){
                filters = await sails.helpers.processFilter(inputs.filters);
				filters = await sails.helpers.processSecondaryFilter.with({filters: filters, mainModel: User}); //procesa los filtros secundarios

            }			
            filters['userActive'] = true; //filtro de elementos no borrados
            
			//se obtiene la cuenta de elementos
			var records = await User.count({
                where: filters,
            });
			
			if(inputs.limit == 0)
                inputs.limit = records;

            if(records  > 0  )
            {
				//if(inputs.limit>=0)
			  //	{

					var pages = Math.ceil(records/ inputs.limit);
					if(inputs.page <= pages && inputs.page > 0 )
					{
						var valueSkip = inputs.limit * (inputs.page - 1); 
						var users = await User.find({
							where: filters, 
							limit: inputs.limit,
							skip: valueSkip,
							sort: sort
						});
						
						if(users)
						{
							for (var i = 0; i < users.length; i++) 
							{
								var brancharr = await UserBranch.find({ userBranchUser: users[i].id, userBranchActive: true }); //coleccion de sucursales del usuario
								
								if(brancharr)
								{
									for(var j = 0; j< brancharr.length; j++)
									{
										
										var branch = await Branch.findOne({ id:brancharr[j].userBranchBranch, branchActive:true }); //datos de la sucursal
										
										if(branch)
										{
											brancharr[j].userBranchBranch = branch;
																						
											var rol = await Role.findOne({ id: brancharr[j].userBranchRole, roleActive:true }); //datos del rol asociado al reistro de surucrsal de usuario
											
											if(rol)
											{
												var roler = await RoleRight.find({ roleRightRole:rol.id, roleRightActive:true }); //reglas asociadas al rol
												
												if(roler)
												{
													for (var k = 0; k < roler.length; k++) 
													{
														var module = await Module.findOne({id:roler[k].roleRightModule, moduleActive:true}); //datos del modulo
														roler[k].roleRightModule =  module;
													}
													
													rol.roleRights = roler;											
												}
												brancharr[j].userBranchRole = rol;
											}
										}
									}
									
									users[i].userBranches = brancharr;
								}
							}
						}
						
						return exits.success
						({
							message:`Listado`,
							object: {totalRecords: records , records: users}
						}); 
					}
					else
					{
						return exits.errorRangoPage({
							error:`Pagina no existe`,
						});
					}
				//}
				/*else
				{
					return exits.errorRangoPage(
					{
						error:`Limite fuera de rango`,
					});
				}*/
            }
			else
			{
                return exits.errorEmpty({
                    message:`Sin coincidencias`
                });

            }
        }
        catch(error)
		{
            return exits.error //aqui va error 500
            ({
                error: error.message,
            });
        }

  }
  
};


	/*var users = await User.find(); //coleccion de usuarios
	
	for (var i = 0; i < users.length; i++) 
	{
		var brancharr = await UserBranch.find({  userBranchUser:users[i].id }); //coleccion de sucursales del usuario
		
		for(var j = 0; j< brancharr.length; j++)
		{
			
			var branch = await Branch.findOne({  id:brancharr[j].userBranchBranch }); //datos de la sucursal
			brancharr[j].userBranchBranch = branch;
			
			
			var rol = await Role.findOne({ id: brancharr[j].userBranchRole }); //datos del rol asociado al reistro de surucrsal de usuario
			
				var roler = await RoleRight.find({ roleRightRole:rol.id });	
				
				for (var k = 0; k < roler.length; k++) 
				{
					var module = await Module.findOne({id:roler[k].roleRightModule});
					roler[k].roleRightModule =  module;
				}
				
				rol.roleRights = roler;
			
			brancharr[j].userBranchRole = rol;
		}
		
		users[i].userBranches = brancharr;
	}
		
	return exits.success
	({
		message:`Listado`,
		object: {totalRecords: 20 , records: users}
	}); */