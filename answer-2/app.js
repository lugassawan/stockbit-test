import express from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./presentation/router";

const app = express();

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

export default app;
