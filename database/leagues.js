/**
 * Generate the query to select data depending on leagueId
 * @param {*} req
 * @param {*} leagueId
 * @returns
 */
async function getLeagueById(req, leagueId) {
  const cluster = req.getCouch();

  let datas = [];

  const listLeague = leagueId.map((league) => `'${league}'`).join(',');

  const query = `
    SELECT *
    FROM mpg
    USE KEYS [${listLeague}];
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

async function createLeague(req, leagueData) {
  const cluster = req.getCouch();

  const datas = [];
  const values = Object.entries(leagueData).map(([k, v]) => `"${k}": "${v}"`).join(',');

  const query = `
    INSERT INTO mpg
    VALUES ("${leagueData.id}", { ${values} })
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
  getLeagueById,
  createLeague,
};
