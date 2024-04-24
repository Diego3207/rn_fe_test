module.exports = 
{

  friendlyName: 'Find',
  description: 'Find role.',


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
	var res = await RoleRight.findOne({ id:inputs.id });		
	
    return exits.success
	({
		message: '',
		data: res,
	});
  }
};