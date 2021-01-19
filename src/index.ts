import { parse } from "tldjs";
import * as fs from "fs";
import academicTlds from "./academicTlds";
import * as path from "path";

function domainWithoutSuffix(domain: string, publicSuffix: string): string {
	return domain.replace("." + publicSuffix, "");
}

export function isAcademic(url: string): boolean {
	const parsedUrl: any = parse(url);
	if (academicTlds.indexOf(parsedUrl.publicSuffix) > -1) {
		return true;
	}
	if (parsedUrl.publicSuffix.split(".").length > 1) {
		const suffixes: Array<string> = parsedUrl.publicSuffix.split(".").reverse();
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
			return true;
		} else {
			return false;
		}
	} else {
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
			return true;
		} else {
			return false;
		}
	}
}
