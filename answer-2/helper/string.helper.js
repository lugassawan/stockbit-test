const escape = (str) => {
	if (str === null || str.length < 1) {
		return "";
	}

	return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = { escape };
