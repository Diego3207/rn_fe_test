const jwt = require('jsonwebtoken');

//https://keepcoding.io/blog/que-es-json-web-token/

module.exports = 
{
  friendlyName: 'Generate new jwt token',
  description: '',

  inputs: 
  {
    subject: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) 
  {
    const payload = 
	{
      sub: inputs.subject, // subject
      iss: 'Report Now Telecomunicaciones S.A. de C.V.', // issuer quien emite el certificado
    };


    const secret = sails.config.jwtSecret || process.env.JWT_SECRET;

    const token = jwt.sign(payload, secret, { expiresIn: '1d' });

    return token;

  },
  
};