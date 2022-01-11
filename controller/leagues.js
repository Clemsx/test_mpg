const leagues = require('../services/leagues');

async function createLeague(req) {
  const leagueData = req.payload;

  const result = await leagues.createLeague(req, leagueData);

  return result;
}

module.exports = { createLeague };
