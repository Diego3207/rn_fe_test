module.exports = {

	friendlyName: 'Update',
	description: 'Update roleRight.',

	inputs: {
		id: {
			type: 'number',
			required: true,
		},
		roleRightRole: {
			type: 'string',
			required: false
		},

		roleRightModule: {
			type: 'string',
			required: false
		},

		roleRightAdd: {
			type: 'boolean',
			required: false
		},

		roleRightUpdate: {
			type: 'boolean',
			required: false
		},

		roleRightDelete: {
			type: 'boolean',
			required: false
		},

		roleRightList: {
			type: 'boolean',
			required: false
		},

		roleRightDisable: {
			type: 'boolean',
			required: false
		}
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

			var create = await RoleRight.update({
				id: inputs.id
			}).set(_.omit(inputs, ['id']));

			return exits.success({
				message: `Actualizado`,
			});

		} catch (error) {
			return exits.error({
				message: `Error `,
				error: error.message,
			});
		}
	}
}