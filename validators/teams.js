/* eslint-disable prefer-regex-literals */
const Joi = require('joi');

const updateTeamParamValidators = Joi.object().keys({
  teamId: Joi.string()
    .pattern(new RegExp(/^mpg_team_\d+_\d+$/))
    .required(),
});

const updateTeamPayloadValidators = Joi.object().keys({
  name: Joi.string().required(),
});

module.exports = { updateTeamParamValidators, updateTeamPayloadValidators };
