
module.exports = {

    friendlyName: 'Model brand query',

    description: 'List of aviable devices by model-brand',

    inputs: {},

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
            }
    },


    fn: async function (inputs, exits)
    {
        try
        {
            //var tkn = this.req.headers['x-access-token']; //obtengo el token del header
            //console.log(tkn);

            const query = `select concat(products.product_brand, " - " ,products.product_model) as product, count(0) as count
                                    from supplies
                                    left join products on products.id = supplies.supply_product_id
                                    left join product_categories on product_categories.product_category_id = products.product_product_category_id\t
                                    where
                                    
                                    supplies.supply_active = 1 
                                    group by products.product_brand, products.product_model`;

            var rawResult = await User.getDatastore().sendNativeQuery(query);

            if(rawResult.rows.length==0)
            {
                return exits.errorEmpty({
                    message:`Sin coincidencias`
                });
            }
            else
            {
                return exits.success
                ({
                    message:`Listado`,
                    object: {records: rawResult.rows}
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
