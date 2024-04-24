
module.exports = {
    friendlyName: 'Add',
      description: 'Add incidence',
    inputs: 
      {
        incidenceCostumerId: //incidence_costumer_id int NOT NULL
        {
          type: 'ref',
          required: true,
        },
        incidenceSourceInformation: //incidence_source_information ENUM('monitoreo','cliente')  
        {
            type:'string',
            required: true,
            
        
        },
        incidenceInformantData:{
          type:'string',
          required: true,
        },
        incidenceStartDateAttention: // incidence_start_date_attention DATETIME NOT NULL
        {
            type: 'ref',
            required: true        
        },
        
        incidenceType: // incidence_type ENUM('operativa','preventiva','informativa')
        {
            type:'string',
            required: true,
        
        },
        incidenceQuadrant: // incidence_quadrant varchar(255) NULL
        {
            type : 'string', 
            required: false,
        
        },
        incidenceStartDate: // incidence_start _date DATETIME NOT NULL
        {
           type: 'ref',
           required: true
        },
        incidenceEndDate: // incidence_end_date DATETIME NOT NULL
        {
          type: 'ref',
          required: true
        
        },
        incidenceDescription: // incidence_description TEXT NOT NULL
        {
          type: 'string',
          required: true
        
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
          required: true
    
        
        },
        incidenceEndDateAttention: // incidence_end_date_attention DATETIME NOT NULL
        {
          type: 'ref',
          required: true
        
        },
        incidenceUserAttendedId:{ //incidence_user_attended_id INT NOT NULL
          type: 'string',
          required: true
  
        }, 
        
    },
      exits:
      { 
        success: 
        {
          statusCode: 201,
          description: 'Registro creado correctamente',
        },
        error: 
        {
          statusCode: 500,
          description: 'Error al crear registro',
        },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            var create =  await Incidence.create(inputs).fetch();

            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: create.id
            });  
       
          }
          catch(error){

              return exits.error
              ({
                  message: `Error `,
                  error: error.message,
              });
          }
      }
  }