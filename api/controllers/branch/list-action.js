module.exports = 
{    
    friendlyName: 'List',
	description: 'List branches.',
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
                        
            if(inputs.filters)
			{
                filters = await sails.helpers.processFilter(inputs.filters);
                filters = await sails.helpers.processSecondaryFilter.with({filters: filters, mainModel: Branch}); //procesa los filtros secundarios

            }
			
            filters['branchActive'] = true;
            var records = await Branch.count({
                where: filters,
            });
			
            if(records  > 0  )
            {
				if(inputs.limit == 0)
					inputs.limit = records;
				
                var pages = Math.ceil(records/ inputs.limit);
                if(inputs.page <= pages && inputs.page > 0 )
                {
                    var valueSkip= inputs.limit * (inputs.page - 1); 
                    var list = await Branch.find({
                        where: filters, 
                        limit: inputs.limit,
                        skip: valueSkip,
                        sort :sort
                    });
                    return exits.success
                    ({
                        message:`Listado`,
                        object: {totalRecords: records , records: list}
                    }); 
                }else{
                    return exits.errorRangoPage({
                        
                        error:`Pagina no existe`,
                    });
                }
            }
			else
			{
                return exits.errorEmpty({
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
