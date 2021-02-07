import { parse } from "tldjs";
import * as fs from "fs";
import academicTlds from "./academicTlds";
import blacklist from "./blacklist";
import * as path from "path";
import { EOL } from "os";

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

export function isAcademic(url: string): boolean {
	const schoolName: string | boolean = getSchoolName(url);
	if (schoolName === false) {
		return false;
	} else {
		return true;
	}
}

export function getSchoolName(url: string): string | boolean {
	const schoolNames: Array<string> | boolean = getSchoolNames(url);
	if (typeof schoolNames === "boolean") {
		return schoolNames;
	} else {
		return schoolNames[0];
	}
}

export function getSchoolNames(url: string): Array<string> | boolean {
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
					"lib",
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
						"lib",
						"domains",
						...suffixes,
						domainWithoutSuffix(parsedUrl.domain, parsedUrl.publicSuffix) +
							".txt"
					)
				)
				.toString("utf-8")
				.replace(EOL, "\n")
				.split("\n")
				.filter(Boolean);
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
					"lib",
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
						"lib",
						"domains",
						parsedUrl.publicSuffix,
						domainWithoutSuffix(parsedUrl.domain, parsedUrl.publicSuffix) +
							".txt"
					)
				)
				.toString("utf-8")
				.replace(EOL, "\n")
				.split("\n")
				.filter(Boolean);
		} else {
			if (temporaryAnswer === true) {
				return true;
			}
			return false;
		}
	}
}
