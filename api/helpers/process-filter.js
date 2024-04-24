module.exports = 
{
  friendlyName: 'Process filter',
  description: '',

  inputs: 
  {
    filters: {
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
    const filters ={};
    JSON.parse(inputs.filters).forEach(element => {          
        if(element['matchMode'] == 'equals'|| element['value'] == true || element['value'] == false ){
            filters[element['field']] = element['value'];

        }else{
			      
            let typeDate = [ 'dateIs','dateIsNot','dateBefore','dateAfter' ];
            if(!typeDate.includes(element['matchMode'])){
              //matchMode => contains (input type text) / startsWith / endsWith / input type boolean  1695144875
              d = {};  
              d[element['matchMode']] = element['value'];
              c = element['field'];
              filters[element['field']] = d;
            }else{
              
              if(( element['field'] == 'createdAt' || element['field'] == 'updatedAt') ){
                //console.log(" TIPO FECHA EN MILISEGUNDOS");
                //cratedAt y updatedAt el valor se guarda en milisegundos
  
                let dateStart = new Date(element['value']);
                let dateEnd = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), 23, 59, 59);
               
                // Nota: todo se compara en milisegundos
                if(element['matchMode'] === 'dateIs'){
                  
                  filters[element['field']] = { ">=" : dateStart.getTime(), "<=" : dateEnd.getTime()};
                } else if (element['matchMode'] === 'dateIsNot'){
                
                  let f1 = {};
                  let f2 = {};
                  f1[element['field']] = { ">" : dateEnd.getTime()};
                  f2[element['field']] = { "<" : dateStart.getTime()}
                  filters['or'] = [ f1 , f2  ];
                
                }else if(element['matchMode'] === 'dateBefore'){
    
                  filters[element['field']] =  { "<" : dateStart.getTime() };
                }else if(element['matchMode'] === 'dateAfter'){
                  d = { ">" : dateEnd.getTime()};
                  filters[element['field']] = d;
                }
                
              }else{

                let date = new Date(element['value']);

                if(element['matchMode'] === 'dateIs'){
                  filters[element['field']] = { "contains" : date.toLocaleDateString('fr-CA')};
                
                }else if(element['matchMode'] === 'dateIsNot'){   
                  let f1 = {};
                  let f2 = {};
                  f1[element['field']] = { ">" : date.toLocaleDateString('fr-CA') + " 23:59:59"};
                  f2[element['field']] = { "<" : date.toLocaleDateString('fr-CA') + " 00:00:00"};
                  filters['or'] = [ f1 , f2  ];
                  //console.log('Date Not de fecha fecha');
                   
                }else if(element['matchMode'] === 'dateBefore'){   

                    filters[element['field']] = { "<" : date.toLocaleDateString('fr-CA') + " 00:00:00"};
                
                }else if(element['matchMode'] === 'dateAfter'){   
                  filters[element['field']] = { ">" : date.toLocaleDateString('fr-CA') + " 23:59:59"};
                }
              }
            }
        }
    });
   // console.log(filters);
    return filters;

  },
  
};

