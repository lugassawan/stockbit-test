const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	development: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		database: process.env.DB_NAME,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		dialect: process.env.DB_DIALECT,
	},
	test: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		database: process.env.DB_NAME_TEST,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		dialect: process.env.DB_DIALECT,
	},
	production: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		database: process.env.DB_NAME,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		dialect: process.env.DB_DIALECT,
		ssl: true,
		dialectOptions: {
			ssl: {
				require: true,
			},
		},
	},
};
