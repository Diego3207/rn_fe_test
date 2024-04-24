module.exports = 
{

  friendlyName: 'Find',
  description: 'Find branch.',


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
	var branch = await Branch.findOne({ id:inputs.id });		
	
    return exits.success
	({
		message: '',
		data: branch,
	});
  }
};