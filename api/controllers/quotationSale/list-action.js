module.exports = {

    friendlyName: 'List',
    description: 'List detail quotation of sale',
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
                    statusCode: 500,
                    description: 'Error general',
                },
            errorEmpty:
                {
                    statusCode:204,
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

        try
        {
           
            let filters = {};
           
            
            let sort = await sails.helpers.processSort(inputs.sort);

            if(inputs.filters)
            {
                filters = await sails.helpers.processFilter(inputs.filters); //crea los filtros
                filters = await sails.helpers.processSecondaryFilter.with({filters: filters, mainModel: QuotationSale}); //procesa los filtros secundarios
            }
            filters['quotationSaleActive'] = true;

            //genera una cuenta de elementos con filtro
            var records = await QuotationSale.count({
                where: filters,
            });

            //si el limite es 0, entonces se extraen todos los elementos
            if(inputs.limit === 0)
                inputs.limit = records;

            if(records  > 0  ) //el numero de coincidencias es mayor a 0
            {
                var pages = Math.ceil(records/ inputs.limit); //se obtiene el numero de paginas en base a cantidad de registros y limite a mostrar

                if(inputs.page <= pages && inputs.page > 0 ) //si la pagina solicitada se encuentra entre las disonibles
                {
                    var valueSkip= inputs.limit * (inputs.page - 1); //valores a omitir

                    //busca los elementos
                    var list = await QuotationSale.find({
                        where: filters,
                        limit: inputs.limit,
                        skip: valueSkip,
                        sort : sort 
                    })
                    .populate('quotationSaleCustomerId')
                    .populate('quotationSaleSalesmanId');

                    return exits.success
                        ({
                            message:`Listado`,
                            object: {totalRecords: records , records: list}
                        });
                }
                else
                {
                    return exits.errorRangoPage({
                        error:`Pagina no existe`,
                    });
                }
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
            return exits.error
            ({
                error: error.message,
            });
        }
    }
}