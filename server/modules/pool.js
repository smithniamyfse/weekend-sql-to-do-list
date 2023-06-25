// Import the pg library and store it as variable
const pg = require('pg');

// Set up pg to connect to the database
// Create a connection pool named "pool" that
    // handles the communication between the server and the database
// pg is the dependency that interacts with pool
const pool = new pg.Pool({
  // Specify the name of the database to connect to
  database: 'weekend_to_do_app',
  // Specify the host where the database is located (e.g., "localhost" if it's on your computer)
  host: 'localhost',
  // Specify the port on which Postgres is listening (default is 5432)
  port: 5432,
});

module.exports = pool;
