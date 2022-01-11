const Joi = require('joi');

const usersByLeagueIdValidator = Joi.object().keys({
  leagueId: Joi.string().required(),
});

module.exports = { usersByLeagueIdValidator };
