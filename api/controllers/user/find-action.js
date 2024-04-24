module.exports = 
{

  friendlyName: 'Find',
  description: 'Find user.',


  inputs: 
  {
	email: {
      type: "string",
    },  
	  
	id: {
      type: "string",
    },
  },


  exits: 
  {

  },


  fn: async function (inputs, exits) 
  {
	var user;
    if(inputs.id)
	{
		user = await User.findOne({ id:inputs.id });		
		var brancharr = await UserBranch.find({ userBranchUser: user.id, userBranchActive: true }); //coleccion de sucursales del usuario	
		user.userBranches = brancharr;
	}
	else if(inputs.email)
	{
		user = await User.findOne({ userEmail:inputs.email });
	}
	
    return exits.success
	({
		message: '',
		data: user,
	});
  }
};