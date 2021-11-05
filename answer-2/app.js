const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const router = require("./presentation/router");

const app = express();

app.use(morgan("combined"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", router);

app.use((req, res) => {
	return res.status(404).json({
		data: null,
		errors: [
			{ field: "api", message: `This url ${req.originalUrl} doesnot exist` },
		],
	});
});

module.exports = app;
