const teams = require('../controller/teams');
const { updateTeamParamValidators, updateTeamPayloadValidators } = require('../validators/teams');

const updateTeam = {
  method: 'PATCH',
  path: '/teams/{teamId}',
  config: {
    handler: async (req, h) => {
      const result = await teams.updateTeam(req);

      return h.response(result).code(result.statusCode);
    },
    validate: {
      params: updateTeamParamValidators,
      payload: updateTeamPayloadValidators,
    },
  },
};

module.exports = [updateTeam];
