export const escape = (str) => {
	return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

export default { escape };
