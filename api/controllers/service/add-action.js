//const Product = require("../../models/Product");

module.exports = {
  // npm install sails-mysql
  friendlyName: 'Add',
	description: 'Add service.',
  inputs: 
	{
    
    serviceDescription: {  // service_description varchar(50) NOT NULL
        type: 'string',
        required: true,
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
        type:'ref', //es string/ref ya que el en el modelo asi esta
        required: true,
        
    },
    
   servicePerDiem: { // service_per_diem double(9,2) NOT NULL
      required: true,
      type:'number',
    },
    serviceCoverZone: { // service_cover_zone varchar(15) NOT NULL
      required: true,
      type: 'string',
    },
    serviceResponseTime: { // service_response_time int(5) NOT NULL
      required: true,
      type: 'number',
    },
    serviceBill : { // service_bill tinyint NOT NULL ---- boolean
      required: true,
      type: 'boolean',
    },
    serviceGuarranty: { // service_guarranty tinyint NOT NULL
      required: true,
      type: 'boolean',*/
   // }
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
      description: 'Error general',
    },
 },
  fn: async function (inputs, exits) 
	{
   
        try {
          //console.log(inputs);
          var createService =  await Service.create(inputs).fetch();
          return exits.success
          ({
              message: 'Registrado correctamente',
              newId: createService.id
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