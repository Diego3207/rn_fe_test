module.exports = {

	tableName: 'role_rights',
	
	attributes: {
		id: {
			type: 'string',
			columnType: 'integer',
			autoIncrement: true,
			columnName: 'role_right_id',
		},

		roleRightRole: //propiedad que enlaza permiso con el rol
		{
			columnType: 'integer',
			columnName: 'role_right_rol',
			model: 'role' //modelo al que esta ligado
		},

		roleRightModule: //propiedad que enlaza el permiso con el modulo
		{

			columnType: 'integer',
			columnName: 'role_right_module',
			model: 'module'
		},



		roleRightAdd: {
			type: 'boolean',
			defaultsTo: false,
			columnType: 'boolean',
			columnName: 'role_right_add',
		},
		roleRightUpdate: {
			type: 'boolean',
			defaultsTo: false,
			columnType: 'boolean',
			columnName: 'role_right_update',
		},
		roleRightDelete: {
			type: 'boolean',
			defaultsTo: false,
			columnType: 'boolean',
			columnName: 'role_right_delete',
		},
		roleRightList: {
			type: 'boolean',
			defaultsTo: false,
			columnType: 'boolean',
			columnName: 'role_right_list',
		},
		roleRightDisable: {
			type: 'boolean',
			defaultsTo: false,
			columnType: 'boolean',
			columnName: 'role_right_disable',
		},




		roleRightActive: {
			type: 'boolean',
			defaultsTo: true,
			columnType: 'boolean',
			columnName: 'role_right_active',
		},


	},


};