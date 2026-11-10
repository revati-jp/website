import { zeroPad } from '#lib/scripts/util.ts';

export class ArticleId {
	/** The year of the article. */
	year: number;
	/**
	 * The month of the article.
	 * It is 1-origin.
	 */
	month: number;
	/** The day of the article. */
	day: number;
	/**
	 * The number of the article in the day.
	 * It is 1-origin.
	 */
	no: number;
	/** The text of the article ID. */
	text?: string;

	/**
	 * @param slug - The slug of an article.
	 * `YYYYMMDD` or `YYYYMMDDNN` or `YYYYMMDD_text` or `YYYYMMDDNN_text` is expected.
	 */
	constructor(slug: string);
	constructor(value: ArticleId);

	constructor(arg: string | ArticleId) {
		if (typeof arg === 'string') {
			let text: string;
			[arg, text] = arg.split('_');
			const no = parseInt(arg.slice(8, 10));
			this.year = parseInt(arg.slice(0, 4));
			this.month = parseInt(arg.slice(4, 6));
			this.day = parseInt(arg.slice(6, 8));
			this.no = isNaN(no) ? 1 : no;
			this.text = text;
		} else {
			this.year = arg.year;
			this.month = arg.month;
			this.day = arg.day;
			this.no = arg.no;
			this.text = arg.text;
		}
	}

	/** Returns the slug string of the article. */
	get string() {
		const text = this.text;
		return `${this.year}${zeroPad(this.month, 2)}${zeroPad(this.day, 2)}${1 < this.no ? zeroPad(this.no, 2) : ''}${text === undefined ? '' : '_' + text}`;
	}

	/** Returns the `Date` object of the article. */
	get date() {
		return new Date(this.year, this.month - 1, this.day);
	}
}
