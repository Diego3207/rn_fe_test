module.exports = {

	friendlyName: 'Update',
	description: 'Update role.',

	inputs: {
		id: {
			type: 'number',
			required: true,
		},
		roleName: 
		{
		  type: 'string',
		  required: false,
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