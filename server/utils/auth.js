const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

const secret = `${process.env.AUTH_SECRET}`;
const expiration = '5h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ userEmail, userName, _id }) {
    const payload = { userEmail, userName, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
