const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

// Connection Credentials
const dbConfig = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORTS,
  ssl: true,
};

// Create a connection pool
// const pool = new Pool(dbConfig);

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Attempt to connect to PostgreSQL
pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err);
    process.exit(1); // Exit the process on connection error
  }

  console.log("Connected to PostgreSQL");

  // Use the client for database operations here

  // Release the client back to the pool
  done();
});

// Handling connection pool events
pool.on("error", (poolErr) => {
  console.error("Error in PostgreSQL connection pool", poolErr);
  process.exit(1); // Exit the process on connection pool error
});

// Note: Avoid calling pool.end() here unless you want to explicitly close the pool
// module.exports = pool; // You may export the pool if needed for other modules

module.exports = pool;
