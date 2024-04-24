
module.exports = {
    
    friendlyName: 'List Filter',
	description: 'List filter evidence of tracker installation',
    inputs: 
	{    
        filters: //
        {
            type: 'json',
            //required: true,
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
            statusCode: 416,
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
            filters['trackerIntallationReviewEvidenceActive'] = true;
            var records = await trackerIntallationReviewEvidence.count({
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
                    var list = await trackerIntallationReviewEvidence.find({
                        where: filters, 
                        limit: inputs.limit,
                        skip: valueSkip,
                        sort :JSON.parse(inputs.sort)
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
            }else{
                return exits.errorEmpty({
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