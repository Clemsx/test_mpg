async function getUserById(req, usersId) {
  const cluster = req.getCouch();

  let datas = [];

  // Concat each user by enclosing them with quote ('xxx')
  const listUser = usersId.map((user) => `'${user}'`).join(',');

  const query = `
    SELECT *
    FROM mpg
    USE KEYS [ ${listUser} ];
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
  getUserById,
};
