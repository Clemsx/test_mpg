const leagueGetter = require('../database/leagues');
const userGetter = require('../database/users');

/**
 * Retrieving username in specific league by leagueId
 * @param {*} req
 * @param {*} leagueId
 * @returns
 */
async function getUsersByLeagueId(req, leagueId) {
  // Get league data
  const leagueData = await leagueGetter.getLeagueById(req, [leagueId]);

  // Get all user_id from object "usersTeams"
  const usersId = leagueData[0]?.usersTeams
    ? Object.keys(leagueData[0].usersTeams)
    : null;

  // Get data for each user found in the league
  let users = [];

  if (usersId) {
    const usersData = await userGetter.getUserById(req, usersId);

    // eslint-disable-next-line arrow-body-style
    users = usersData.map((user) => {
      return {
        name: user.name,
      };
    });
  }

  return {
    users,
  };
}

module.exports = {
  getUsersByLeagueId,
};
