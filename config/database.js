const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    logging: true,
    sync: { force: true },
    pool: {
        max: 20,
        idle: 3000,
    }
}