module.exports = {
  
  tableName: 'users',
  attributes: 
  {
    id: 
	{ 
      type: 'string',      
      columnType: 'integer',
      autoIncrement: true,
      columnName: 'user_id',
	},
	
	userImage: //avatar del usuario
	{ 
      type: 'string',
      columnType: 'varchar(512)',
      columnName: 'user_image',
    },

	userFullName: 
	{
      type: 'string',
      required: true,
	  columnType: 'varchar(255)',
      columnName: 'user_full_name',
    },
	
    userEmail: 
	{
      type: 'string',
      required: true,
      unique: true,
	  columnType: 'varchar(255)',
	  columnName: 'user_email',
    },
	
    userEmailStatus: 
	{
      type: 'string',
      isIn: ['unconfirmed', 'confirmed'],
      defaultsTo: 'unconfirmed',
	  columnType: 'varchar(255)',
      columnName: 'user_email_status',
    },
	
    userEmailProofToken: 
	{
      type: 'string',
      columnType: 'varchar(255)',
	  description: 'This will be used in the account verification email',
      columnName: 'user_email_proof_token',
    },
	
    userEmailProofTokenExpiresAt: 
	{
      type: 'number',
      columnType: 'double',
	  description:'time in milliseconds representing when the emailProofToken will expire',
      columnName: 'user_email_proof_token_expires_at',
    },
	
    userPassword: 
	{
      type: 'string',
	  columnType: 'varchar(255)',
      required: true,
	  columnName: 'user_password',
    },
	
    userPasswordResetToken: 
	{
      type: 'string',
	  columnType: 'varchar(255)',
      description:'A unique token used to verify the user\'s identity when recovering a password.',
      columnName: 'user_password_reset_token',
    },

    userPasswordResetTokenExpiresAt: 
	{
      type: 'number',
	  columnType: 'double',
      description:'A timestamp representing the moment when this user\'s `passwordResetToken` will expire (or 0 if the user currently has no such token).',
      example: 1508944074211,
      columnName: 'user_password_reset_token_expires_at',
    },
	
	userBranches: //coleccion de sucursales del usuario
	{
		collection: 'userbranch', 
		via: 'userBranchUser'  
	},

	userActive : 
	{
      type: 'boolean',
      defaultsTo : true, 
      columnType: 'boolean',      
      columnName: 'user_active', 
    },

  },
  
  customToJSON: function () 
  {
    return _.omit(this, ['userPassword']);
  },
  
  beforeCreate: async function (values, proceed) 
  {
    const hashedPassword = await sails.helpers.passwords.hashPassword( values.userPassword );
    values.userPassword = hashedPassword;
    return proceed();
  },
  
};