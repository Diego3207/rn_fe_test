module.exports = {

    friendlyName: 'Sale order query',
    description: 'List of sale order ',

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
            const query = `SELECT count(0) as count, DATE_FORMAT(sale_order_date, '%Y-%m') as date 
                            FROM dev_rnadmin.sale_orders where sale_order_active =  true 
                            group by DATE_FORMAT(sale_order_date, '%Y-%m') 
                            order by DATE_FORMAT(sale_order_date, '%Y-%m') asc`;

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