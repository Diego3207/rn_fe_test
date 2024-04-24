
module.exports = {
    
    friendlyName: 'List',
	description: 'List provider service',
    inputs: 
	{    
        filters: //
        {
            type: 'json',
        },
        limit: {
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
          statusCode: 500,//500
          description: 'Error general',
        },
        errorEmpty: 
        {
          statusCode: 204, //
          description: 'Sin coincidencias',
        },
        //agregar error de limit 400
        errorRangoPage: 
        {
            statusCode: 416, //Rango no permitido
            description: 'Valor exceden el rango permitido ',
        }
    },
    fn: async function (inputs, exits) 
	{
        try {
            let filters = {};
            
            if(inputs.filters){
                filters = await sails.helpers.processFilter(inputs.filters);
            }
            filters['providerServiceActive'] = true;
            var records = await ProviderService.count({
                where: filters,
            });

            if(inputs.limit == 0)
                inputs.limit = records;

            if(records  > 0  )
            {
                var pages = Math.ceil(records/ inputs.limit);
                if(inputs.page <= pages && inputs.page > 0 )
                {
                    var valueSkip= inputs.limit * (inputs.page - 1); 
                    var list = await ProviderService.find({
                        where: filters, 
                        limit: inputs.limit,
                        skip: valueSkip,
                        sort :JSON.parse(inputs.sort)
                    }).populate('providerServiceServiceId');
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
            }else{
                return exits.errorEmpty({
                    message:`Sin coincidencias`
                });

            }
        }
        catch(error){
            return exits.error
            ({
                error: error.message,
            });
        }
    }
}
