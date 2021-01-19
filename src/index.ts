import { parse } from "tldjs";
import * as fs from "fs";
import academicTlds from "./academicTlds";
import blacklist from "./blacklist";
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

let existsAsync: Function = null;
let readFileAsync: Function = null;

// Check if fs already supports promises (node >= 11) or if we have to improvise
if (fs.promises === undefined) {
	// Create asynchronous version of the functions using util.promisify
	const util = require("util");
	existsAsync = util.promisify(fs.exists);
	readFileAsync = util.promisify(fs.readFile);
} else {
	// Set "readFileAsync" to Promise version, but we have to implement existsAsync ourselves because of the deprecation of "exists".
	readFileAsync = fs.promises.readFile;
	existsAsync = async function (fileName: string) {
		try {
			await fs.promises.stat(fileName);
			return true;
		} catch (err: any) {
			if (err.code === "ENOENT") {
				return false;
			} else {
				throw err;
			}
		}
	};
}

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
