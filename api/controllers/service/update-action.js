
module.exports = {
    
    friendlyName: 'Update',
	description: 'Update service',
    
    
    
    inputs: 
	{   
    id: {  // provider_id varchar(250)  NOT  NULL
      type: 'number',
      required: true,
    },
    serviceDescription: {  // service_description varchar(50) NOT NULL
      type: 'string',
      //required: true,
    },
    serviceQuantityTemporality: {
      type: 'ref',
      required: false, 
    },
    serviceTemporality: {
      type: 'ref',
      required: false, 
    },
    servicePrice: {
      type: 'ref',
      required: true, 
    },
 /* serviceProviderId: { // service_provider_id  NOT NULL
      type: 'ref', //es string/ref ya que el en el modelo  asociado asi esta
    
  },
 /* servicePerDiem: { // service_per_diem double(9,2) NOT NULL
   // required: true,
    type:'number',
  },
  serviceCoverZone: { // service_cover_zone varchar(15) NOT NULL
    //required: true,
    type: 'string',
  },
  serviceResponseTime: { // service_reponse_time int(5) NOT NULL
   // required: true,
    type: 'number',
  },
  serviceBill : { // service_bill tinyint NOT NULL ---- boolean
   // required: true,
    type: 'boolean',
  },
  serviceGuarranty: { // service_guarranty tinyint NOT NULL
    //required: true,
    type: 'boolean',
  }*/

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
     //sails.log('Aqui ando');
      try {
        
        var update =  await Service.update({
              id: inputs.id
          }).set(_.omit (inputs , ['id']));
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