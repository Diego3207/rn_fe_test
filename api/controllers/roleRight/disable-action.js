module.exports = {

	friendlyName: 'Disable',
	description: 'Disable roleRight',



	inputs: {
		id: {
			type: 'number',
			required: true,
		},

	},
	exits: {
		error: {
			statusCode: 500,
			description: 'Error general',
		},

	},

	fn: async function(inputs, exits) {

		try {


			var disable = await RoleRight.update({
				id: inputs.id
			}).set({
				userBranchActive: false
			});

			return exits.success({
				message: `Se mandó a papelera`,
			});

		} catch (error) {
			return exits.error({
				error: error.message,
			});
		}
	}
}