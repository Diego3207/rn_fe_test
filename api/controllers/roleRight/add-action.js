module.exports = {

	friendlyName: 'Add',
	description: 'Add roleRight.',

	inputs: {

		roleRightRole: {
			type: 'string'
		},

		roleRightModule: {
			type: 'string'
		},

		roleRightAdd: {
			type: 'boolean',
		},

		roleRightUpdate: {
			type: 'boolean',
		},

		roleRightDelete: {
			type: 'boolean',
		},

		roleRightList: {
			type: 'boolean',
		},

		roleRightDisable: {
			type: 'boolean',
		},


	},

	exits: {

		success: {
			statusCode: 201,
			description: 'Registro creado correctamente',
		},
		error: {
			statusCode: 500,
			description: 'Error general',
		},
	},


	fn: async function(inputs, exits) {
		try {

			var create = await RoleRight.create(inputs).fetch();
			return exits.success({
				message: 'Registrado correctamente',
				newId: create.id
			});

		} catch (error) {
			return exits.error({
				message: `Error `,
				error: error.message,
			});
		}
	}
}