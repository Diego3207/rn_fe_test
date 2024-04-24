module.exports = {
    
    friendlyName: 'List',
	description: 'Querys native in sim cards',
    inputs: 
	{    
       
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
            switch (inputs.type) {
                case 1:
                    
                    
                    var query = `
                    
                    SELECT sc.sim_card_id as id, sc.sim_card_number as simCardNumber,sc.sim_card_supply_id as supplyId,s.supply_key as iccid
                    FROM sim_cards as sc
                    left join trackers as t on sc.sim_card_id = t.tracker_sim_card_id 
                    inner join supplies as s on sc.sim_card_supply_id = s.supply_id
                    where t.tracker_id is null AND sc.sim_card_active = 1;`;

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