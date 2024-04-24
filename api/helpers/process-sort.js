module.exports = 
{
  friendlyName: 'Process filter',
  description: '',

  inputs: 
  {
    sort: {
      type: 'json',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  // transforma el json de filtros a un arreglo para el query
  fn: async function (inputs) 
  {
    const sort =[];

    JSON.parse(inputs.sort).forEach(function(element){
      const regex = /(\w+)\['(\w+)'\]/; 
      const match = (Object.keys(element)[0]).match(regex);

      if (!match){            
          sort.push(element);
      }
    });
    
    return sort;

  },
  
};

