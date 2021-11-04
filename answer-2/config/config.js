import dotenv from "dotenv";

dotenv.config();

export default {
	app: {
		port: process.env.PORT || 3001,
	},
	omdb: {
		url: process.env.OMDB_URL,
		secretKey: process.env.OMDB_KEY,
	},
	db: {
		host: process.env.DB_HOST,
		name: process.env.DB_NAME,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		dialect: process.env.DB_DIALECT,
	},
};
