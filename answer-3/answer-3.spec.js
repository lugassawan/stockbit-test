import { performance } from "perf_hooks";
import { findFirstStringInBracket, refactor } from "./answer-3";

describe("Answer 3", () => {
	let t0;
	let t1;

	test("input 1 when it is null", () => {
		const input = null;
		let message = "Test #1 : ";

		t0 = performance.now();
		expect(() => {
			findFirstStringInBracket(input);
		}).toThrowError();
		t1 = performance.now();
		message += `Trivial ${t1 - t0} ms.`;

		t0 = performance.now();
		const output = refactor(input);
		t1 = performance.now();
		console.log(`${message} Refactor ${t1 - t0} ms.`);

		expect(output).toBe("");
	});

	test("input 2 when it is empty string", () => {
		const input = "";
		let message = "Test #2 : ";

		t0 = performance.now();
		const output1 = findFirstStringInBracket(input);
		t1 = performance.now();
		message += `Trivial ${t1 - t0} ms.`;

		t0 = performance.now();
		const output2 = refactor(input);
		t1 = performance.now();
		console.log(`${message} Refactor ${t1 - t0} ms.`);

		expect(output1).toBe("");
		expect(output2).toBe("");
		expect(output1).toEqual(output2);
	});

	test("input 3 when it has no bracket", () => {
		const input =
			"Aenean at turpis rhoncus, euismod nisi id, ornare metus. Fusce faucibus mauris id est pretium accumsan.";

		let message = "Test #3 : ";

		t0 = performance.now();
		const output1 = findFirstStringInBracket(input);
		t1 = performance.now();
		message += `Trivial ${t1 - t0} ms.`;

		t0 = performance.now();
		const output2 = refactor(input);
		t1 = performance.now();
		console.log(`${message} Refactor ${t1 - t0} ms.`);

		expect(output1).toBe("");
		expect(output2).toBe("");
		expect(output1).toEqual(output2);
	});

	test("input 4 when it has multiple brackets", () => {
		const input =
			"Aenean at turpis (rhoncus), euismod nisi id, ornare metus. Fusce (faucibus) mauris id est pretium (accumsan).";

		let message = "Test #4 : ";

		t0 = performance.now();
		const output1 = findFirstStringInBracket(input);
		t1 = performance.now();
		message += `Trivial ${t1 - t0} ms.`;

		t0 = performance.now();
		const output2 = refactor(input);
		t1 = performance.now();
		console.log(`${message} Refactor ${t1 - t0} ms.`);

		expect(output1).toBe("rhoncus");
		expect(output2).toBe("rhoncus");
		expect(output1).toEqual(output2);
	});

	test("input 5 when it has string with white space after opening bracket", () => {
		const input =
			"Aenean at turpis rhoncus, ( euismod) nisi id, ornare metus. Fusce faucibus mauris id est pretium accumsan.";

		let message = "Test #5 : ";

		t0 = performance.now();
		const output1 = findFirstStringInBracket(input);
		t1 = performance.now();
		message += `Trivial ${t1 - t0} ms.`;

		t0 = performance.now();
		const output2 = refactor(input);
		t1 = performance.now();
		console.log(`${message} Refactor ${t1 - t0} ms.`);

		expect(output1).toBe(" euismod");
		expect(output2).toBe("euismod");
		expect(output1).not.toEqual(output2);
	});

	test("input 6 when it has string with white space before closing bracket", () => {
		const input =
			"Aenean at turpis rhoncus, (euismod ) nisi id, ornare metus. Fusce faucibus mauris id est pretium accumsan.";

		let message = "Test #6 : ";

		t0 = performance.now();
		const output1 = findFirstStringInBracket(input);
		t1 = performance.now();
		message += `Trivial ${t1 - t0} ms.`;

		t0 = performance.now();
		const output2 = refactor(input);
		t1 = performance.now();
		console.log(`${message} Refactor ${t1 - t0} ms.`);

		expect(output1).toBe("euismod ");
		expect(output2).toBe("euismod");
		expect(output1).not.toEqual(output2);
	});

	test("input 7 when it has sequencetial opening bracket", () => {
		const input =
			"Aenean at (turpis (rhoncus), euismod) nisi id, ornare metus. Fusce (faucibus) mauris id est (pretium) accumsan.";

		let message = "Test #7 : ";

		t0 = performance.now();
		const output1 = findFirstStringInBracket(input);
		t1 = performance.now();
		message += `Trivial ${t1 - t0} ms.`;

		t0 = performance.now();
		const output2 = refactor(input);
		t1 = performance.now();
		console.log(`${message} Refactor ${t1 - t0} ms.`);

		expect(output1).toBe("turpis (rhoncus");
		expect(output2).toBe("turpis (rhoncus");
		expect(output1).toEqual(output2);
	});

	test("input 8 when it doesnot have any string inside bracket", () => {
		const input = "()";

		let message = "Test #8 : ";

		t0 = performance.now();
		const output1 = findFirstStringInBracket(input);
		t1 = performance.now();
		message += `Trivial ${t1 - t0} ms.`;

		t0 = performance.now();
		const output2 = refactor(input);
		t1 = performance.now();
		console.log(`${message} Refactor ${t1 - t0} ms.`);

		expect(output1).toBe("");
		expect(output2).toBe("");
		expect(output1).toEqual(output2);
	});

	test("input 9 when it only contains 1 opening bracket and string length is 1", () => {
		const input = "(";

		let message = "Test #9 : ";

		t0 = performance.now();
		const output1 = findFirstStringInBracket(input);
		t1 = performance.now();
		message += `Trivial ${t1 - t0} ms.`;

		t0 = performance.now();
		const output2 = refactor(input);
		t1 = performance.now();
		console.log(`${message} Refactor ${t1 - t0} ms.`);

		expect(output1).toBe("");
		expect(output2).toBe("");
		expect(output1).toEqual(output2);
	});

	test("input 10 when it only contains 1 closing bracket and string length is 1", () => {
		const input = ")";

		let message = "Test #10 : ";

		t0 = performance.now();
		const output1 = findFirstStringInBracket(input);
		t1 = performance.now();
		message += `Trivial ${t1 - t0} ms.`;

		t0 = performance.now();
		const output2 = refactor(input);
		t1 = performance.now();
		console.log(`${message} Refactor ${t1 - t0} ms.`);

		expect(output1).toBe("");
		expect(output2).toBe("");
		expect(output1).toEqual(output2);
	});

	test("input 11 when it only has opening bracket", () => {
		const input = "(sasa";

		let message = "Test #11 : ";

		t0 = performance.now();
		const output1 = findFirstStringInBracket(input);
		t1 = performance.now();
		message += `Trivial ${t1 - t0} ms.`;

		t0 = performance.now();
		const output2 = refactor(input);
		t1 = performance.now();
		console.log(`${message} Refactor ${t1 - t0} ms.`);

		expect(output1).toBe("");
		expect(output2).toBe("");
		expect(output1).toEqual(output2);
	});

	test("input 12 when it only has closing bracket", () => {
		const input = "sasa)";

		let message = "Test #12 : ";

		t0 = performance.now();
		const output1 = findFirstStringInBracket(input);
		t1 = performance.now();
		message += `Trivial ${t1 - t0} ms.`;

		t0 = performance.now();
		const output2 = refactor(input);
		t1 = performance.now();
		console.log(`${message} Refactor ${t1 - t0} ms.`);

		expect(output1).toBe("");
		expect(output2).toBe("");
		expect(output1).toEqual(output2);
	});
});
