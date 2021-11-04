export const greetHello = (req, res) => {
	return res.status(200).json({
		data: {
			hostname: req.hostname,
			message: "Hello, this is entry point",
		},
		errors: null,
	});
};

export default { greetHello };
