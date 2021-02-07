/**
 * Copyright (c) 2021 Marvin Schopf
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * @copyright 2021 Marvin Schopf
 * @license Apache-2.0
 * 
 */

import { parse } from "tldjs";
import { promises as fs } from "fs";
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

export async function isAcademic(url: string): Promise<boolean> {
	const schoolName: string | boolean = await getSchoolName(url);
	if (schoolName === false) {
		return false;
	} else {
		return true;
	}
}

export async function getSchoolName(url: string): Promise<string | boolean> {
	const schoolNames: Array<string> | boolean = await getSchoolNames(url);
	if (typeof schoolNames === "boolean") {
		return schoolNames;
	} else {
		return schoolNames[0];
	}
}

export async function getSchoolNames(url: string): Promise<string[] | boolean> {
	const parsedUrl = parse(url);

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

	if (parsedUrl.publicSuffix.split(".").length > 1) {
		// If the suffix consists of multiple domains, split them into an array and reverse it
		const suffixes: Array<string> = parsedUrl.publicSuffix.split(".").reverse();

		try {
			return (
				await fs.readFile(
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
			)
				.toString()
				.split(EOL)
				.filter(Boolean);
		} catch (e) {
			return temporaryAnswer ? true : false;
		}
	} else {
		try {
			return (
				await fs.readFile(
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
			)
				.toString("utf-8")
				.split(EOL)
				.filter(Boolean);
		} catch (e) {
			return temporaryAnswer ? true : false;
		}
	}
}
