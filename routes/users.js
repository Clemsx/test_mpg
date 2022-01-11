const users = require('../controller/users');
const { usersByLeagueIdValidator } = require('../validators/users');

const usersByLeagueId = {
  method: 'GET',
  path: '/users/{leagueId}',
  config: {
    handler: async (req) => {
      const result = await users.getUsersInLeagueId(req);
      return result;
    },
    validate: {
      params: usersByLeagueIdValidator,
    },
  },
};

module.exports = [usersByLeagueId];
