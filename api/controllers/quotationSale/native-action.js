module.exports = {
    
    friendlyName: 'List',
	description: 'Querys native in quotation sales',
    inputs: 
	{    
       
       type:{
        type: 'number',
        required: true,
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
            switch (inputs.type) {
                case 1:
                    var query = `
                    SELECT  *
                    FROM   quotation_sales as q
                    WHERE   
                    NOT EXISTS
                        (SELECT  1  FROM   sale_orders as o WHERE   o.sale_order_quotation_sale_id = q.quotation_sale_id)
                    AND q.quotation_sale_status = 'nueva' AND q.quotation_sale_active = 1 ;`;
        
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