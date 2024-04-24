module.exports = 
{    
    friendlyName: 'List',
	description: 'List roles.',
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
          statusCode: 204,// Peticion sin contenido
          description: 'Sin registros',
        },
        errorRangoPage: 
        {
            statusCode: 416,// Rango no satisfactorio
            description: 'Valor exceden el rango permitido ',
        }
    },
	
    fn: async function (inputs, exits) 
	{
        try 
		{
            let filters = {};
            let sort = await sails.helpers.processSort(inputs.sort);
            
            if(inputs.filters){
                filters = await sails.helpers.processFilter(inputs.filters);
                filters = await sails.helpers.processSecondaryFilter.with({filters: filters, mainModel: Role}); //procesa los filtros secundarios
            }
			
            filters['roleActive'] = true;
            
			var records = await Role.count
			({
                where: filters,
            });
            
			if(records  > 0  )
            {
                if(inputs.limit==0)
					inputs.limit = records;
				
				var pages = Math.ceil(records/ inputs.limit);
                if(inputs.page <= pages && inputs.page > 0 )
                {
                    var valueSkip= inputs.limit * (inputs.page - 1); 
                    
					var list = await Role.find({
                        where: filters, 
                        limit: inputs.limit,
                        skip: valueSkip,
                        sort : sort
                    }).populate('roleRights');
                    
					
					for (var i = 0; i < list.length; i++) 
					{
						for(var j = 0; j< list[i].roleRights.length; j++)
						{
							var mod = await Module.findOne({ id:list[i].roleRights[j].roleRightModule, moduleActive:true });
							id:list[i].roleRights[j].roleRightModule = mod;
						}
					}
					
					return exits.success
                    ({
                        message:`Listado`,
                        object: {totalRecords: records , records: list}
                    }); 
                }
				else
				{
                    return exits.errorRangoPage
					({
                        
                        error:`Pagina no existe`,
                    });
                }
            }
			else
			{
                return exits.errorEmpty
				({
                    message:`Sin registros`
                });

            }
        }
        catch(error)
		{
            return exits.error
            ({
                error: error.message,
            });
        }
    }
}
