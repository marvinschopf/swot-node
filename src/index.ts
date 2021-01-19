import { parse } from "tldjs";
import * as fs from "fs";
import academicTlds from "./academicTlds";
import blacklist from "./blacklist";
import { promisify } from "util";
import * as path from "path";

// Remove public suffixes from the domain
function domainWithoutSuffix(
	domain: string,
	publicSuffix: string
): string | boolean {
	if (domain == null || domain.length === 0) {
		return publicSuffix;
	}
	return domain.replace("." + publicSuffix, "");
}

// Create asynchronous version of the functions using util.promisify
const existsAsync: Function = promisify(fs.exists);
const readFileAsync: Function = promisify(fs.readFile);

export async function isAcademicAsync(url: string) {
	const schoolName: string | boolean = await getSchoolNameAsync(url);
	if (schoolName === false) {
		return false;
	} else {
		return true;
	}
}

export function isAcademic(url: string): boolean {
	const schoolName: string | boolean = getSchoolName(url);
	if (schoolName === false) {
		return false;
	} else {
		return true;
	}
}

export async function getSchoolNameAsync(url: string) {
	// Parse the URL using TLDjs
	const parsedUrl: any = parse(url);

	if (parsedUrl.publicSuffix === null) {
		return false;
	}

	if (blacklist.indexOf(parsedUrl.domain) > -1) {
		return false;
	}

	let temporaryAnswer: boolean = false;

	// Check if the TLD is an academic TLD
	if (academicTlds.indexOf(parsedUrl.publicSuffix) > -1) {
		temporaryAnswer = true;
	}

	// Check how many TLD's the suffix consists of
	if (parsedUrl.publicSuffix.split(".").length > 1) {
		// If the suffix consists of multiple domains, split them into an array and reverse it
		const suffixes: Array<string> = parsedUrl.publicSuffix.split(".").reverse();

		// Check if the file of the institution exists
		if (
			await existsAsync(
				path.resolve(
					__dirname,
					"..",
					"data",
					"domains",
					...suffixes,
					domainWithoutSuffix(parsedUrl.domain, parsedUrl.publicSuffix) + ".txt"
				)
			)
		) {
			return (
				await readFileAsync(
					path.resolve(
						__dirname,
						"..",
						"data",
						"domains",
						...suffixes,
						domainWithoutSuffix(parsedUrl.domain, parsedUrl.publicSuffix) +
							".txt"
					)
				)
			)
				.toString("utf-8")
				.replace("\n", "");
		} else {
			if (temporaryAnswer === true) {
				return true;
			}
			return false;
		}
	} else {
		// If the suffix consists of only one domain, it can be searched for without making any further changes to the suffix.
		if (
			await existsAsync(
				path.resolve(
					__dirname,
					"..",
					"data",
					"domains",
					parsedUrl.publicSuffix,
					domainWithoutSuffix(parsedUrl.domain, parsedUrl.publicSuffix) + ".txt"
				)
			)
		) {
			return (
				await readFileAsync(
					path.resolve(
						__dirname,
						"..",
						"data",
						"domains",
						parsedUrl.publicSuffix,
						domainWithoutSuffix(parsedUrl.domain, parsedUrl.publicSuffix) +
							".txt"
					)
				)
			)
				.toString("utf-8")
				.replace("\n", "");
		} else {
			if (temporaryAnswer === true) {
				return true;
			}
			return false;
		}
	}
}

export function getSchoolName(url: string): string | boolean {
	// Parse the URL using TLDjs
	const parsedUrl: any = parse(url);

	if (parsedUrl.publicSuffix === null) {
		return false;
	}

	if (blacklist.indexOf(parsedUrl.domain) > -1) {
		return false;
	}

	let temporaryAnswer: boolean = false;

	// Check if the TLD is an academic TLD
	if (academicTlds.indexOf(parsedUrl.publicSuffix) > -1) {
		temporaryAnswer = true;
	}

	// Check how many TLD's the suffix consists of
	if (parsedUrl.publicSuffix.split(".").length > 1) {
		// If the suffix consists of multiple domains, split them into an array and reverse it
		const suffixes: Array<string> = parsedUrl.publicSuffix.split(".").reverse();

		// Check if the file of the institution exists
		if (
			fs.existsSync(
				path.resolve(
					__dirname,
					"..",
					"data",
					"domains",
					...suffixes,
					domainWithoutSuffix(parsedUrl.domain, parsedUrl.publicSuffix) + ".txt"
				)
			)
		) {
			return fs
				.readFileSync(
					path.resolve(
						__dirname,
						"..",
						"data",
						"domains",
						...suffixes,
						domainWithoutSuffix(parsedUrl.domain, parsedUrl.publicSuffix) +
							".txt"
					)
				)
				.toString("utf-8")
				.replace("\n", "");
		} else {
			if (temporaryAnswer === true) {
				return true;
			}
			return false;
		}
	} else {
		// If the suffix consists of only one domain, it can be searched for without making any further changes to the suffix.
		if (
			fs.existsSync(
				path.resolve(
					__dirname,
					"..",
					"data",
					"domains",
					parsedUrl.publicSuffix,
					domainWithoutSuffix(parsedUrl.domain, parsedUrl.publicSuffix) + ".txt"
				)
			)
		) {
			return fs
				.readFileSync(
					path.resolve(
						__dirname,
						"..",
						"data",
						"domains",
						parsedUrl.publicSuffix,
						domainWithoutSuffix(parsedUrl.domain, parsedUrl.publicSuffix) +
							".txt"
					)
				)
				.toString("utf-8")
				.replace("\n", "");
		} else {
			if (temporaryAnswer === true) {
				return true;
			}
			return false;
		}
	}
}
