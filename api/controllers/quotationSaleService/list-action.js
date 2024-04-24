
module.exports = {
    
    friendlyName: 'List',
	description: 'List quotation of sale',
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
        try {
            let filters = {};
           
            if(inputs.filters){
                filters = await sails.helpers.processFilter(inputs.filters);
            }
            filters['quotationSaleServiceActive'] = true;
            var records = await QuotationSaleService.count({
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
                    var list = await QuotationSaleService.find({
                        where: filters, 
                        limit: inputs.limit,
                        skip: valueSkip,
                        sort :JSON.parse(inputs.sort)
                    })
                    .populate('quotationSaleServiceServiceId')
                    .populate('quotationSaleServiceQuotationSaleId');

                    if(list)
                    {
                        for (var i = 0; i < list.length; i++) 
                        {
                            //Obtiene los datos del cliente
                            var customer = await Costumer.findOne({ id: list[i].quotationSaleServiceQuotationSaleId.quotationSaleCustomerId, costumerActive: true });
                            list[i].quotationSaleServiceCustomerInformation = (customer == undefined ? null:customer);

                            //Obtiene los datos de la Orden de Venta
                            var saleOrder = await SaleOrder.findOne({ saleOrderQuotationSaleId: list[i].quotationSaleServiceQuotationSaleId.id, saleOrderActive: true });
                            list[i].quotationSaleServiceSaleOrderInformation = (saleOrder == undefined ? null:saleOrder);

                            //Obtiene los datos de la tabla de asociación            
                            var associations = await AssociationTrackerService.find({ associationTrackerServiceQuotationSaleServiceId: list[i].id, associationTrackerServiceActive: true });
                            list[i].quotationSaleServiceAssociations = (associations == undefined ? null:associations);

                            //Obtiene la instalación
                            for (var j = 0; j < list[i].quotationSaleServiceAssociations.length ; j++){
                                var installation = await TrackerInstallation.findOne({ id: list[i].quotationSaleServiceAssociations[j].associationTrackerServiceTrackerInstallationId, trackerInstallationActive: true });                       
                                //Obtiene el rastreador
                                if(installation != undefined){
                                    var tracker = await Tracker.findOne({ id: installation.trackerInstallationTrackerId , trackerActive: true }); 
                                    list[i].quotationSaleServiceAssociations[j].tracker = tracker;

                                    //Obtiene el vehiculo
                                    var vehicle = await Vehicle.findOne({ id: installation.trackerInstallationVehicleId , vehicleActive: true });
                                    list[i].quotationSaleServiceAssociations[j].vehicle = vehicle;
                                }
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