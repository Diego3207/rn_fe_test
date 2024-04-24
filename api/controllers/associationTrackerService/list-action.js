
module.exports = {
    
    friendlyName: 'List',
	description: 'List AssociationTrackerService',
    inputs: 
	{   
        filters: //
        {
            type: 'json',
            //required: true,
        },
        limit:  //limite
        {
          type: 'number',
          required: true,
        },
        page: // numero de pagina que desea ver el usuario
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
            filters = await sails.helpers.processSecondaryFilter.with({filters: filters, mainModel: AssociationTrackerService}); //procesa los filtros secundarios

        }
        
        filters['associationTrackerServiceActive'] = true;
        
        var records = await AssociationTrackerService.count
        ({
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
                var list = await AssociationTrackerService.find({
                    where: filters, 
                    limit: inputs.limit,
                    skip: valueSkip,
                    sort : sort
                })
                .populate('associationTrackerServiceQuotationSaleServiceId')
                .populate('associationTrackerServiceTrackerInstallationId');

                if(list)
                {
                    for (var i = 0; i < list.length; i++) 
                    {
                        
                        //Obtiene los datos de la cotización
                        var quotation = await QuotationSale.findOne({ id: list[i].associationTrackerServiceQuotationSaleServiceId.quotationSaleServiceQuotationSaleId, quotationSaleActive: true });
                        list[i].associationTrackerServiceQuotationInformation = (quotation == undefined ? null:quotation);

                        //Obtiene los datos del rastreador
                        var tracker = await Tracker.findOne({ id: list[i].associationTrackerServiceTrackerInstallationId.trackerInstallationTrackerId , trackerActive: true });
                        list[i].associationTrackerServiceTrackerInformation = (tracker == undefined ? null:tracker);

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
                error: error.message,
            });
        }
    }
}