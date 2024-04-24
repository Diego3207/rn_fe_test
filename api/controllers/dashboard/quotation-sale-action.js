module.exports = {

    friendlyName: 'Quotation sales query',

    description: 'List of quotation sales and his status ',

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
            const query = `SELECT count(0) as count, DATE_FORMAT(FROM_UNIXTIME(createdAt / 1000), '%Y-%m') as date, quotation_sale_status 
                                    FROM dev_rnadmin.quotation_sales
                                    GROUP BY DATE_FORMAT(FROM_UNIXTIME(createdAt / 1000), '%Y-%m'), quotation_sale_status`;

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