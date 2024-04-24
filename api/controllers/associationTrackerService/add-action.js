module.exports = {
    // npm install sails-mysql
    friendlyName: 'Add',
      description: 'Add AssociationTrackerService.',
    inputs: 
      {      
        associationTrackerServiceQuotationSaleServiceId: { 
        type:'ref',
        required: true
      },

      associationTrackerServiceTrackerInstallationId: { 
        type:'ref',
        required: true
      }
    },
      exits:
      { 
        success: 
        {
          statusCode: 201,
          description: 'Dispositivo registrado correctamente',
        },
        error: 
        {
          statusCode: 500,
          description: 'Error al registrar Dispositivo',
        },
      },
    fn: async function (inputs, exits) 
      {
     
          try {
            //console.log(inputs);
            var createAssociationTrackerService =  await AssociationTrackerService.create(inputs).fetch();
            return exits.success
            ({
                message: 'Registrado correctamente',
                newId: createAssociationTrackerService.id
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