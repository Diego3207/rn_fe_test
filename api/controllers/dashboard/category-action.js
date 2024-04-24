module.exports = {

    friendlyName: 'Category count query',

    description: 'List of categories ',

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


    fn: async function (inputs, exits) {
        try {
            const query = `SELECT count(0) count, product_categories.product_category_description
                                    FROM supplies
                                    LEFT JOIN products on products.id = supplies.supply_product_id
                                    LEFT JOIN product_categories on product_categories.product_category_id = products.product_product_category_id
                                    group by product_categories.product_category_description`;

            var rawResult = await User.getDatastore().sendNativeQuery(query);

            if (rawResult.rows.length == 0) {
                return exits.errorEmpty({
                    message: `Sin coincidencias`
                });
            } else {
                return exits.success
                ({
                    message: `Listado`,
                    object: {records: rawResult.rows}
                });
            }

        } catch (error) {
            return exits.error
            ({
                error: error.message,
            });
        }
    }
}