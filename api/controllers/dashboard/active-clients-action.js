module.exports = {

    friendlyName: 'Active clients',

    description: 'List of active clients ',

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
            const query = `SELECT DATE_FORMAT(FROM_UNIXTIME(createdAt / 1000), '%Y-%m') AS date, COUNT(*) as count  
                                    FROM dev_rnadmin.costumers 
                                    WHERE costumer_active = 1 AND costumer_status = 1 
                                    GROUP BY DATE_FORMAT(FROM_UNIXTIME(createdAt / 1000), '%Y-%m') 
                                    order by DATE_FORMAT(FROM_UNIXTIME(createdAt / 1000), '%Y-%m') asc`;

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