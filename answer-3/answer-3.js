export function findFirstStringInBracket(str) {
	if (str.length > 0) {
		let indexFirstBracketFound = str.indexOf("(");
		if (indexFirstBracketFound >= 0) {
			let wordsAfterFirstBracket = str.substr(indexFirstBracketFound);
			if (wordsAfterFirstBracket) {
				wordsAfterFirstBracket = wordsAfterFirstBracket.substr(1);
				let indexClosingBracketFound = wordsAfterFirstBracket.indexOf(")");
				if (indexClosingBracketFound >= 0) {
					return wordsAfterFirstBracket.substring(0, indexClosingBracketFound);
				} else {
					return "";
				}
			} else {
				return "";
			}
		} else {
			return "";
		}
	} else {
		return "";
	}
}

export function refactor(str) {
	const emptyString = "";

	if (str === null || str.length <= 2) {
		return emptyString;
	}

	let firstOpeningBracketIndex = str.indexOf("(");
	if (firstOpeningBracketIndex < 0) {
		return emptyString;
	}

	let firstClosingBracketIndex = str.indexOf(")");
	if (firstClosingBracketIndex < 0) {
		return emptyString;
	}

	return str
		.substring(firstOpeningBracketIndex + 1, firstClosingBracketIndex)
		.trim();
}
