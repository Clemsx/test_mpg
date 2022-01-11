const teams = require('../services/teams');

async function updateTeam(req) {
  const newTeamData = req.payload;
  const { teamId } = req.params;

  const result = await teams.updateTeam(req, teamId, newTeamData);

  return result;
}

module.exports = { updateTeam };
