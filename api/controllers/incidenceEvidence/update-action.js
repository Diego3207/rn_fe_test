
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update dependency',
    
  inputs: 
	{  
    id: {  
      type: 'number',
      required: true,
    }, 
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
      error: 
        {
          statusCode: 500,
          description: 'Error general',
        },
      
    },
    fn: async function (inputs, exits) 
	{
    
    try {
        
    var update =  await IncidenceEvidence.update({
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