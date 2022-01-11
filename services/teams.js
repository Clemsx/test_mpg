const teamsDbHelpers = require('../database/teams');

async function updateTeam(req, teamId, newTeamData) {
  // Get league data
  const isExistingTeam = await teamsDbHelpers.getTeamsById(req, [teamId]);

  let result;

  if (isExistingTeam.length > 0) {
    result = await teamsDbHelpers.updateTeam(req, teamId, newTeamData);
  } else {
    return { message: `Team with Id '${teamId}' not found`, statusCode: 404 };
  }

  return {
    message: result,
    statusCode: 200,
  };
}

module.exports = {
  updateTeam,
};
