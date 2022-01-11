const users = require('../services/users');

async function getUsersInLeagueId(req) {
  const { leagueId } = req.params;
  const result = await users.getUsersByLeagueId(req, leagueId);

  return result;
}

module.exports = { getUsersInLeagueId };
