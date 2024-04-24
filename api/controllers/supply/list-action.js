module.exports = {
    
    friendlyName: 'List ',
	description: 'List supplies',
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
            let sort = await sails.helpers.processSort(inputs.sort);

            if(inputs.filters)
            {
                filters = await sails.helpers.processFilter(inputs.filters); //crea los filtros
                filters = await sails.helpers.processSecondaryFilter.with({filters: filters, mainModel: Supply}); //procesa los filtros secundarios
            }
			
            filters['supplyActive'] = true;
            var records = await Supply.count({
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
                    var list = await Supply.find({
                        where: filters, 
                        limit: inputs.limit,
                        skip: valueSkip,
                        sort :sort
                    })
                    .populate('supplyProductId')
                    .populate('supplyPurchaseOrderId')
                    .populate('supplySaleOrderId')
                    .populate('supplyLocationId');

                    if(list)
                    {

                       
                        for (var i = 0; i < list.length; i++) 
                        {
                            if(list[i].supplyProductId.productCategoryId == 1){
                                var tracker = await Tracker.findOne({ trackerSupplyId: list[i].id, trackerActive: true });
                               list[i].supplyInformation = (tracker == undefined ? null:tracker);
                            // console.log(tracker)
                            } else if (list[i].supplyProductId.productCategoryId == 2){
                                var sim = await SimCard.findOne({ simCardSupplyId: list[i].id, simCardActive: true });
                                list[i].supplyInformation =  (sim == undefined ? null: sim);
                            }else{
                                list[i].supplyInformation = null;
                            }
                        }    
                            


                    }

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