module.exports = {
    
    friendlyName: 'List',
	description: 'Querys native in quotation purchases',
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
                    FROM  quotation_purchases as q
                    WHERE   
                    NOT EXISTS
                        (SELECT  1  FROM    purchase_orders as o WHERE   o.purchase_order_quotation_purchase_id = q.quotation_purchase_id)
                    AND q.quotation_purchase_status = 'aceptada' AND  q.quotation_purchase_active = 1;`;
        
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