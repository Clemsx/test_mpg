/* eslint-disable prefer-regex-literals */
const Joi = require('joi');

const createLeagueValidator = Joi.object().keys({
  id: Joi.string().pattern(new RegExp(/^mpg_league_\d+$/)).required(),
  name: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  adminId: Joi.string().pattern(new RegExp(/^user_\d+$/)).required(),
});

module.exports = { createLeagueValidator };
