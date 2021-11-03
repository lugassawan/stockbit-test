function hash(str) {
	let sum = 0;

	for (let i = 0; i < str.length; i++) {
		sum += str.charCodeAt(i);
	}

	return sum;
}

export function groupingAnagram(strs) {
	const result = [];

	if (strs === null || strs.length < 1) {
		return result;
	}

	if (strs.length === 1) {
		return strs;
	}

	const listMap = new Map();
	for (let i = 0; i < strs.length; i++) {
		if (strs[i].length > 0) {
			const hashKey = hash(strs[i].toLowerCase());
			if (listMap.has(hashKey)) {
				const arr = listMap.get(hashKey);
				arr.push(strs[i]);

				listMap.set(hashKey, arr);
			} else {
				listMap.set(hashKey, [strs[i]]);
			}
		}
	}

	for (const values of listMap.values()) {
		result.push(values);
	}

	const sorted = result.sort((a, b) => {
		if (a.length > b.length) {
			return -1;
		}

		if (a.length < b.length) {
			return 1;
		}

		if (a[0].length > b[0].length) {
			return -1;
		}

		if (a[0].length < b[0].length) {
			return 1;
		}

		return 0;
	});

	return sorted;
}
