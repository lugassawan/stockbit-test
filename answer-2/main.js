const app = require("./app");

const PORT = process.env.PORT || 3000;

function main() {
	return app.listen(PORT, () => {
		console.log(`App is running on port : ${PORT}`);
	});
}

main();
