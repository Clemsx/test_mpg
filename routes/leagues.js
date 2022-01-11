const leagues = require('../controller/leagues');
const { createLeagueValidator } = require('../validators/leagues');

const createLeague = {
  method: 'POST',
  path: '/leagues',
  config: {
    handler: async (req, h) => {
      const result = await leagues.createLeague(req);

      return h.response(result).code(result.statusCode);
    },
    validate: {
      payload: createLeagueValidator,
    },
  },
};

module.exports = [createLeague];
