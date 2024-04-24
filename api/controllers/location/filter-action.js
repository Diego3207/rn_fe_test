
module.exports = {
    
    friendlyName: 'List Filter',
	description: 'List filter location',
    inputs: 
	{    
        filters: //
        {
            type: 'json',
            required: true,
        },
        limit:  // limite
        {
          type: 'number',
          required: true,
        },
        page: // numero de pagina que desea ver el usuario
        {
          type: 'number',
          required: true,
        },
        sort: // tal cual llega el json solo se parsea y asi es utilizable
        {
          type: 'json',
          required: true,
        },

    },
	exits:
	{
        error: 
        {
          statusCode: 300,
          description: 'Error general',
        },
        errorEmpty: 
        {
          statusCode: 301,
          description: 'Sin coincidencias',
        },
        errorRangoPage: 
        {
            statusCode: 302,
            description: 'Valor exceden el rango permitido ',
        }
    },
    fn: async function (inputs, exits) 
	{
        try {
            let filters = await sails.helpers.processFilter(inputs.filters);
            
            var records = await Location.count({
                where: filters,
            });
            if(records  > 0  )
            {
                var pages = Math.ceil(records/ inputs.limit);
                if(inputs.page <= pages && inputs.page > 0 )
                {
                    var valueSkip= inputs.limit * (inputs.page - 1); 
                    var list = await Location.find({
                        where: filters, 
                        limit: inputs.limit,
                        skip: valueSkip,
                        sort :JSON.parse(inputs.sort)
                    });
                    return exits.success
                        ({
                           message: `Filtrado`,
                           totalRegistros: records ,
                           registros: list
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