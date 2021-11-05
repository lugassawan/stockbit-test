const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	app: {
		port: process.env.PORT || 3001,
	},
	omdb: {
		url: process.env.OMDB_URL,
		secretKey: process.env.OMDB_KEY,
	},
	db: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		database:
			process.env.NODE_ENV === "test"
				? process.env.DB_NAME_TEST
				: process.env.DB_NAME,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		dialect: process.env.DB_DIALECT,
		logging: process.env.NODE_ENV === "test" ? false : console.log,
		ssl: process.env.NODE_ENV === "production",
		dialectOptions:
			process.env.NODE_ENV === "production"
				? {
						ssl: {
							require: process.env.NODE_ENV === "production",
						},
				  }
				: {},
	},
};
