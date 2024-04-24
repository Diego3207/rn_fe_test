module.exports = {
    
    friendlyName: 'List',
	description: 'Querys native in trackers',
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
                    
                    var customer_id = JSON.parse(inputs.parameters)['customer_id'];
                    
                    query = `
                    
                    SELECT t.tracker_id as id,t.tracker_imei as trackerImei , t.tracker_status as trackerStatus
                    FROM trackers as t
                    inner join supplies as s on t.tracker_supply_id = s.supply_id
                    inner join sale_orders as so on s.supply_sale_order_id = so.sale_order_id
                    left join quotation_sales as qs on so.sale_order_quotation_sale_id = qs.quotation_sale_id
                    where qs.quotation_sale_customer_id = `+customer_id+` AND t.tracker_active = 1 ;
                    
                    `;
        
                    result = await sails.sendNativeQuery(query);

        

                break;
                
            }
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