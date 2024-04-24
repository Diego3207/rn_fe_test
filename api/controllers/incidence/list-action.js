
module.exports = {
    
    friendlyName: 'List',
	description: 'List dependency',
    inputs: 
	{    
       
        filters: //
        {
            type: 'json',
            //required: true,
        },
        limit:  // limite
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
        try {
            let filters = {};
            let sort = await sails.helpers.processSort(inputs.sort);
            
            if(inputs.filters){
                filters = await sails.helpers.processFilter(inputs.filters);
                filters = await sails.helpers.processSecondaryFilter.with({filters: filters, mainModel: Incidence}); //procesa los filtros secundarios

            }

            filters['incidenceActive'] = true;

            var records = await Incidence.count({
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
                    var list = await Incidence.find({
                        where: filters, 
                        limit: inputs.limit,
                        skip: valueSkip,
                        sort : sort
                    }).populate('incidenceCostumerId');

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
                    code:301,
                    message:`Sin coincidencias`
                });

            }
        }
        catch(error){
            return exits.error
            ({
                //message: `Error logging in user ${inputs.email}`,
                error: error.message,
            });
        }
    }
}
