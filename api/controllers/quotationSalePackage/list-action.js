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
            filters['quotationSalePackageActive'] = true;
            var records = await QuotationSalePackage.count({
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
                    var list = await QuotationSalePackage.find({
                        where: filters, 
                        limit: inputs.limit,
                        skip: valueSkip,
                        sort: JSON.parse(inputs.sort)
                    });
                   
                    if(list){
                        for (var i = 0; i < list.length; i++) 
							{
                                list[i].quotationSalePackageProducts = [];
                                list[i].quotationSalePackageServices = [];

                                var productPack = await PackageProduct.find({ packageProductPackageId: list[i].quotationSalePackagePackageId, packageProductActive: true }); 
                                var servicePack = await PackageService.find({ packageServicePackageId: list[i].quotationSalePackagePackageId, packageServiceActive: true }); 

                                if(productPack){
                                    var arr = [];
                                    for (var j = 0; j < productPack.length; j++){
                                        var product = await Product.findOne({ id: productPack[j].packageProductProductId, productActive: true }); 
                                        productPack[j].infoDetail = product;
                                        arr.push(productPack[j]);
                                        
                                    }
                                    list[i].quotationSalePackageProducts = arr;
                                }

                                if(servicePack){
                                    var arr = [];
                                    for (var j = 0; j < servicePack.length; j++){
                                        var service = await Service.findOne({ id: servicePack[j].packageServiceServiceId, serviceActive: true }); 
                                        servicePack[j].infoDetail = service;
                                        arr.push(servicePack[j]);
                                        
                                    }
                                    list[i].quotationSalePackageServices = arr;
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