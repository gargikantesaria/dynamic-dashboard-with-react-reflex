import {Symbols} from "./Symbols";

class LookupDriver {
	constructor(exchanges) {
	}

	acceptText(text, filter, maxResults, cb) {
		cb(
			Symbols.filter((symbol) =>
				symbol.symbol.toLowerCase().includes(text.toLowerCase()) ||
				symbol.name.toLowerCase().includes(text.toLowerCase()))
				.map((symbol) => ({
					data: symbol,
					display: [symbol.symbol, symbol.name, symbol.exchDisp]
				}))
		);
	}
}

export default LookupDriver;
