import { performance } from "perf_hooks";
import { groupingAnagram } from "./answer-4";

describe("Answer 4", () => {
	let t0;
	let t1;

	test("input 1 when it is null", () => {
		const input = null;

		t0 = performance.now();
		const output = groupingAnagram(input);
		t1 = performance.now();
		console.log(`Test #1 : ${t1 - t0} ms.`);

		expect(output).toHaveLength(0);
	});

	test("input 2 when it is empty array", () => {
		const input = [];

		t0 = performance.now();
		const output = groupingAnagram(input);
		t1 = performance.now();
		console.log(`Test #2 : ${t1 - t0} ms.`);

		expect(output).toHaveLength(0);
	});

	test("input 3 when it has only one string inside array", () => {
		const input = ["tika"];

		t0 = performance.now();
		const output = groupingAnagram(input);
		t1 = performance.now();
		console.log(`Test #3 : ${t1 - t0} ms.`);

		expect(output).toHaveLength(1);
		expect(output).toEqual(input);
	});

	test("input 4 when it has multiple string inside array", () => {
		const input = ["kita", "atik", "tika", "aku", "kia", "makan", "kua"];

		t0 = performance.now();
		const output = groupingAnagram(input);
		t1 = performance.now();
		console.log(`Test #4 : ${t1 - t0} ms.`);

		expect(output).toHaveLength(4);
		expect(output[0]).toEqual(["kita", "atik", "tika"]);
		expect(output[1]).toEqual(["aku", "kua"]);
		expect(output[2]).toEqual(["makan"]);
		expect(output[3]).toEqual(["kia"]);
	});

	test("input 5 when it has one empty string inside array", () => {
		const input = ["kita", "atik", "", "tika", "aku", "kia", "makan", "kua"];

		t0 = performance.now();
		const output = groupingAnagram(input);
		t1 = performance.now();
		console.log(`Test #5 : ${t1 - t0} ms.`);

		expect(output).toHaveLength(4);
		expect(output[0]).toEqual(["kita", "atik", "tika"]);
		expect(output[1]).toEqual(["aku", "kua"]);
		expect(output[2]).toEqual(["makan"]);
		expect(output[3]).toEqual(["kia"]);
	});

	test("input 6 when it has multiple empty string inside array", () => {
		const input = [
			"kita",
			"atik",
			"",
			"tika",
			"aku",
			"kia",
			"",
			"makan",
			"kua",
		];

		t0 = performance.now();
		const output = groupingAnagram(input);
		t1 = performance.now();
		console.log(`Test #6 : ${t1 - t0} ms.`);

		expect(output).toHaveLength(4);
		expect(output[0]).toEqual(["kita", "atik", "tika"]);
		expect(output[1]).toEqual(["aku", "kua"]);
		expect(output[2]).toEqual(["makan"]);
		expect(output[3]).toEqual(["kia"]);
	});

	test("input 7 when it has one string with capitalize / uppercase inside array", () => {
		const input = ["kita", "atik", "TIKA", "Aku", "kia", "makan", "kua"];

		t0 = performance.now();
		const output = groupingAnagram(input);
		t1 = performance.now();
		console.log(`Test #7 : ${t1 - t0} ms.`);

		expect(output).toHaveLength(4);
		expect(output).toEqual([
			["kita", "atik", "TIKA"],
			["Aku", "kua"],
			["makan"],
			["kia"],
		]);
	});
});
