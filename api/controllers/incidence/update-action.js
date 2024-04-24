
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update dependency',
    
  inputs: 
	{  
    id: {  
      type: 'number',
      required: true,
    }, 
    incidenceCostumerId: //incidence_costumer_id int NOT NULL
    {
      type: 'ref',
      required: false,
    },
    incidenceSourceInformation: //incidence_source_information ENUM('monitoreo','cliente')  
    {
      type:'string',
      required: false,  
        
    },
    incidenceStartDateAttention: // incidence_start_date_attention DATETIME NOT NULL
    {
      type: 'ref',
      required: false        
    },
        
    incidenceType: // incidence_type ENUM('operativa','preventiva','informativa')
    {
      type:'string',
      required: false,
        
    },
    incidenceQuadrant: // incidence_quadrant varchar(255) NULL
    {
      type : 'string', 
      required: false,
        
    },
    incidenceStartDate: // incidence_start _date DATETIME NOT NULL
    {
      type: 'ref',
      required: false
    },
    incidenceEndDate: // incidence_end_date DATETIME NOT NULL
    {
      type: 'ref',
      required: false
        
    },
    incidenceDescription: // incidence_description TEXT NOT NULL
    {
      type: 'string',
      required: false
        
    },
    incidenceDescriptionInvolvedPeople: // incidence_description_involved_people TEXT NOT NULL
    {
      type: 'string',
      required: false
        
    },
    incidenceDescriptionInvolvedVehicles: // incidence_description_involved_vehicles TEXT NOT NULL
    {
      type: 'ref',
      required: false
        
    },
    
    incidenceObservation: // incidence_observation TEXT NULL
    {
      type: 'string',
      required: false
        
    },
    incidenceIsPositive: // incidence_is_positive tinyint (1) NOT NULL
    {
      type: 'string',
      required: false
    
        
    },
    incidenceEndDateAttention: // incidence_end_date_attention DATETIME NOT NULL
    {
      type: 'ref',
      required: false
        
    },
    incidenceUserAttendedId:{ //incidence_user_attended_id INT NOT NULL
      type: 'string',
      required: true

    },
  },
	exits: 
	{
      error: 
        {
          statusCode: 500,
          description: 'Error general',
        },
      
    },
    fn: async function (inputs, exits) 
	{
    
    try {
        
    var update =  await Incidence.update({
            id: inputs.id
        }).set(_.omit(inputs, ['id'])); 
        return exits.success
          ({           
            message: `Actualizado`,
          }); 
       
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