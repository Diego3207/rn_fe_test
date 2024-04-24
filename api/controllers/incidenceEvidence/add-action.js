
module.exports = {
    friendlyName: 'Add',
      description: 'Add evidence of incidence',
    inputs: 
      {
        incidenceEvidenceIncidenceId: {  // incidence_evidence_incidence_id  INT  NULL
          type: 'ref',
          required : true
        },
        incidenceEvidencePath: {  //  incidence_evidence_path varchar NOT NULLL
          type:'string',
          required : true
        },
        incidenceEvidenceSize: {  //  incidence_evidence_size INT NOT NULLL
          
          type:'ref',
          required : true
        },
        incidenceEvidenceName: {  //  incidence_evidence_name varchar NOT NULLL
          type:'string',
          required : true
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
            var create =  await IncidenceEvidence.create(inputs).fetch();

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