module.exports = {
    
    friendlyName: 'List',
	description: 'Querys native in supplies',
    inputs: 
	{    
       // type, parameters
       type:{
        type: 'number',
        required: true,
       },
       parameters:{
        type:'json',
        required:false
       }

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
        
    },
    fn: async function (inputs, exits) 
	{
        try {
            let result = [];
            let query = '';
            switch (inputs.type) {
                
                case 1:
                    //supplies of type tracker
                query = `
                
                    SELECT s.supply_id as id , s.supply_key as supplyKey, concat_ws('',p.product_brand,p.product_model) as product
                    FROM supplies as s
                    LEFT JOIN trackers as t on s.supply_id = t.tracker_supply_id
                    LEFT JOIN products as p on s.supply_product_id = p.id
                    where t.tracker_id is null and s.supply_active = 1 and s.supply_status = 'disponible' and p.product_product_category_id = 1;`;
         
                    result = await sails.sendNativeQuery(query);

                break;
                case 2:
                    //supplies of type simcards
                    query = `
                
                    SELECT s.supply_id as id , s.supply_key as supplyKey, concat_ws('',p.product_brand,p.product_model) as product
                    FROM supplies as s
                    LEFT JOIN sim_cards as sc on s.supply_id = sc.sim_card_supply_id
                    LEFT JOIN products as p on s.supply_product_id = p.id
                    where sc.sim_card_id is null and s.supply_active = 1 and s.supply_status = 'disponible' and p.product_product_category_id = 2;`;
         
                    result = await sails.sendNativeQuery(query);
                    break;
                
            }
            //sails.log(result);
            if(result.rows.length > 0){
                return exits.success(
       
                    {
                        message:`Listado`,
                        object: result.rows
                    }
                );

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