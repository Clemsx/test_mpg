require('dotenv').config();

const Hapi = require('@hapi/hapi');
const couchbase = require('couchbase');
const routes = require('./routes');

async function main() {
  const cluster = await couchbase.connect(
    `couchbase://${process.env.DB_HOST}`,
    {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
  );

  const server = Hapi.server({
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST,
  });

  server.decorate('request', 'getCouch', () => cluster);

  server.route(routes);

  server.start();

  console.log('Server running on %s', server.info.uri);
}

// Run the main function
main();
