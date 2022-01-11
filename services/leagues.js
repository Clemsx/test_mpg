const leagueDbHelpers = require('../database/leagues');

async function createLeague(req, leagueData) {
  // Get league data
  const isExistingLeague = await leagueDbHelpers.getLeagueById(req, [leagueData.id]);

  if (isExistingLeague.length > 0) return { message: `League Id '${leagueData.id}' already exist`, statusCode: 403 };

  const result = await leagueDbHelpers.createLeague(req, leagueData);

  return {
    message: result,
    statusCode: 201,
  };
}

module.exports = {
  createLeague,
};
