module.exports = 
{

  friendlyName: 'Find',
  description: 'Find module.',


  inputs: 
  {
	id: {
      type: "string",
    },
  },


  exits: 
  {
  },


  fn: async function (inputs, exits) 
  {
	var res = await Module.findOne({ id:inputs.id });		
	
    return exits.success
	({
		message: '',
		data: res,
	});
  }
};