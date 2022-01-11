/**
 * Generate the query to select data depending on teamId
 * @param {*} req
 * @param {*} leagueId
 * @returns
 */
async function getTeamsById(req, teamId) {
  const cluster = req.getCouch();

  const datas = [];

  const listTeams = teamId.map((team) => `'${team}'`).join(',');

  const query = `
    SELECT *
    FROM mpg
    USE KEYS [${listTeams}];
    `;

  try {
    const result = await cluster.query(query);

    if (result?.rows) {
      result.rows.forEach((row) => {
        datas.push(row[process.env.DB_BUCKET]);
      });
    }
  } catch (err) {
    console.log(err);
  }

  return datas;
}

/**
 * Update a team name depending on the teamId
 * @param {*} req
 * @param {Object} teamData
 * @param {string} teamId
 * @returns
 */
async function updateTeam(req, teamId, teamData) {
  const cluster = req.getCouch();

  const datas = [];
  const values = Object.entries(teamData)
    .map(([k, v]) => `${k} = "${v}"`)
    .join(',');

  const query = `
    UPDATE mpg
    SET ${values}
    WHERE id = '${teamId}'
    `;

  try {
    const result = await cluster.query(query);

    if (result?.rows) {
      result.rows.forEach((row) => {
        datas.push(row[process.env.DB_BUCKET]);
      });
    }
  } catch (err) {
    console.log(err);
  }

  return datas;
}

module.exports = {
  getTeamsById,
  updateTeam,
};
