module.exports = {
    
    friendlyName: 'List',
	description: 'Querys native in tracker installations',
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
                    
                    var id = JSON.parse(inputs.parameters)['installation_id'];
                    
                    query = `
                    
                    SELECT i.tracker_installation_date as 'date' , concat_ws(' ','Se realizó instalación', ti.installer_name)  as 'description', 'installation' as 'type' ,i.tracker_installation_id as id 
                    FROM dev_rnadmin.tracker_installations as i 
                    left join dev_rnadmin.installers as ti on ti.installer_id = i.tracker_installation_installer_id
                    where  i.tracker_installation_id = `+id+`
                    UNION
                    SELECT r.tracker_installation_review_date  as 'date' ,  concat_ws(' ','Revisión realizada por', tr.installer_name)  as 'description' ,'review' as 'type' , r.tracker_installation_review_id as id 
                    FROM dev_rnadmin.tracker_installation_reviews as r 
                    left join dev_rnadmin.installers as tr on tr.installer_id = r.tracker_installation_review_technical_user_id
                    where  r.tracker_installation_review_tracker_installation_id = `+id+`
                    UNION
                    SELECT u.tracker_unistall_date as 'date' , concat_ws(' ','Se realizó desinstalación por', tu.installer_name)   as 'description', 'uninstall' as 'type' ,u.tracker_uninstall_id as id 
                    FROM dev_rnadmin.tracker_uninstalls as u 
                    left join dev_rnadmin.installers as tu on tu.installer_id = u.tracker_uninstall_uninstaller_user_id
                    
                    where  u.tracker_uninstall_tracker_installation_id = `+id+`
                    
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