module.exports = 
{

  friendlyName: 'Find',
  description: 'Find role.',


  inputs: 
  {
    id: {
      type: "string",
    },
    roleName: 
    {
      type: 'string',
      required: false,
    },
  },


  exits: 
  {
  },


  fn: async function (inputs, exits) 
  {
	var res = await Role.findOne({ id:inputs.id })
  .populate('roleRights', {
    where: {
      roleRightActive: true
    }
  });		
	
    return exits.success
	({
		message: '',
		data: res,
	});
  }
};