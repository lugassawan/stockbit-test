import CustomError from "./../custom-error.helper";

describe("CustomError", () => {
	test("when options is not provided", () => {
		const error = CustomError("test");
		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe("test");
		expect(error.statusCode).toBe(400);
		expect(error.fieldName).toBe("Error");
	});

	test("when statusCode is not provided", () => {
		const error = CustomError("test", { fieldName: "t" });
		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe("test");
		expect(error.statusCode).toBe(400);
		expect(error.fieldName).toBe("t");
	});

	test("when fieldName is not provided", () => {
		const error = CustomError("test", { statusCode: 200 });
		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe("test");
		expect(error.statusCode).toBe(200);
		expect(error.fieldName).toBe("Error");
	});

	test("when options is provided", () => {
		const error = CustomError("test", { statusCode: 200, fieldName: "t" });
		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe("test");
		expect(error.statusCode).toBe(200);
		expect(error.fieldName).toBe("t");
	});
});
