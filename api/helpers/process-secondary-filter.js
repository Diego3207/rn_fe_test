module.exports =
{
    friendlyName: 'Process external filters',
    description: 'Process filters to construct rules for external tables/models.',

    inputs:
    {
        filters: {
            type: 'ref',
            required: true,
            description: 'Filters to process',
        },
        mainModel: {
            type: 'ref',
            required: true,
            description: 'The main model class (e.g., QuotationSale)',
        }
    },

    fn: async function (inputs, exits)
    {
        let { filters, mainModel } = inputs; //deconstruccion de parametros, asignando el contenido de input a variables, evita usar el input.
        var filtrosExternos = {};

        //evalua los filtros para construir las reglas a tablas externas
        for (const key of Object.keys(filters))
        {
            //si la propiedad invocada no pertenece directamente al modelo debe ser un error o una propiedad de otro modelo
            if(!mainModel.attributes[key])
            {
                const regex = /(\w+)\['(\w+)'\]/; //con esta regla evaluo si tiene la forma  propiedaddeclase['propiedad']
                const match = key.match(regex);

                if (match) //si obtengo una coincidencia, es probable que sea una regal para otro modelo
                {
                    //como referencia ejemplo de filtro :   "quotationSaleCustomerId['costumerName']": { contains: 'REPORT NOW' }
                    const clase = match[1]; // = "quotationSaleCustomerId"
                    const propiedad = match[2]; // = "costumerName"
                    //key   =  quotationSaleCustomerId['costumerName']
                    //filters[key]  = { contains: 'REPORT NOW' }

                    if(!filtrosExternos[clase])
                    {
                        filtrosExternos[clase] = {};
                    }
                    filtrosExternos[clase][propiedad] = filters[key]; //los agrego como un elemento asociativo por que en javascript y sails no puedo duplicar el nombre
                                                                      // de una propiedad, aunque quisiera aplicar dos reglas, tendria que aplicarlas sobre el mismo nombre
                                                                      // ejemplo pripiedad nombre que contenga x y que no sea w
                                                                      //where: { nombre: { contains: 'x', '!=': 'w' } }
                }
                //si no es una propiedad directa del modelo y ya fue evaluada, se elimina para no generar error
                delete filters[key];
            }
        }
        //aplico las reglas a los modelos externos para obtener ids que se aplicaran a los filtros originales
        for (const key of Object.keys(filtrosExternos))
        {
            var model; //modelo al que esta vinculado la propiedad
            var property = mainModel.attributes[key]; //obtengo el atributo llave foranea a otro modelo
            if (property.model) //si es de tipo modelo o coleccion
                model = sails.models[property.model]; //obtengo la clase a partir del nombre de modelo
            else if(property.collection)
                model = sails.models[property.collection];

            if(model) //si logro obtener un modelo a partir del atributo
            {
                var primaryKey = model.primaryKey; //si tiene la llave primaria no importa si es id o la cambiaron por algo custom
                if(primaryKey) //aplico el query a tabla externa solo si tiene llave primaria, si no tengo
                {               //llave primaria, no puedo aplicar el criterio
                    //aplico el conjunto de reglas externas al modeloX para obtener la llave priomariaX
                    var ids = await model.find({
                        select: [primaryKey],
                        where: filtrosExternos[key]
                    });
                    var elements_res = ids.map(e => e[primaryKey]); //(x => x.id); //extraigo la coleccion de llaves
                    filters[key] = elements_res; //agrego la condicion  "atributo tiene que esta entre las llaves" a la lista de filtros
                }
            }
        }
        //------ fin de filtros externos

        // Return the processed filters
        return exits.success(filters);
    }
};
