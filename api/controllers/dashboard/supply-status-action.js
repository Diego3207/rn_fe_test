module.exports = {

    friendlyName: 'Supply status query',

    description: 'List of supply status',

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
            const query = `SELECT count(0) as count, supply_status as status
                                    FROM dev_rnadmin.supplies 
                                    where supply_active = 1 
                                    group by supply_status`;

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
