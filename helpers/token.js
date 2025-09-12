const JsonWebToken = require("jsonwebtoken");
const JwtConfig = require("../config/jwt");

module.exports = {
  create: async (data) => {
    return JsonWebToken.sign(data, JwtConfig.external);
  },
  verify: async (token) => {
    return JsonWebToken.verify(token, JwtConfig.external);
  },
};
