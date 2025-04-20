import { expect } from "chai";
import { isAcademic, getSchoolName, getSchoolNames } from "./../src";
import { randomBytes } from "crypto";

import * as path from "path";
import * as fs from "fs";
import * as assert from "assert";

function makeid(length: number): string {
	return randomBytes(length).toString("hex");
}

function getDomainFile(domainPath: string): string {
	return fs
		.readFileSync(
			path.resolve(
				__dirname,
				"..",
				"data",
				"lib",
				"domains",
				domainPath + ".txt"
			)
		)
		.toString("utf-8")
		.replace("\n", "");
}

describe("isAcademic Test Suite", function () {
	it("Test berlin.de", async () => {
		expect(await isAcademic("berlin.de")).to.equal(true);
	});
	it("Test stanford.edu", async () => {
		expect(await isAcademic("stanford.edu")).to.equal(true);
	});
	it("Test github.com", async () => {
		expect(await isAcademic("github.com")).to.equal(false);
	});
	it("Test itb.edu.bn", async () => {
		expect(await isAcademic("itb.edu.bn")).to.equal(true);
	});
	it("Test itb.bn", async () => {
		expect(await isAcademic("itb.bn")).to.equal(false);
	});
	it("Test yorkuniversity.us", async () => {
		expect(await isAcademic("yorkuniversity.us")).to.equal(true);
	});
	const randomString1: string = makeid(16);
	const randomString2: string = makeid(16);
	const randomString3: string = makeid(16);
	const randomString4: string = makeid(16);
	const randomString5: string = makeid(16);
	const randomString6: string = makeid(16);
	it("Test " + randomString1 + ".edu", async () => {
		expect(await isAcademic(randomString1 + ".edu")).to.equal(true);
	});
	it("Test " + randomString2 + ".ac.ae", async () => {
		expect(await isAcademic(randomString2 + ".ac.ae")).to.equal(true);
	});
	it("Test america.edu", async () => {
		expect(await isAcademic("america.edu")).to.equal(false);
	});
	it("Test mail.america.edu", async () => {
		expect(await isAcademic("mail.america.edu")).to.equal(false);
	});
	it("Test mail@berlin.de", async () => {
		expect(await isAcademic("mail@berlin.de")).to.equal(true);
	});
	it("Test mail@" + randomString3 + ".edu", async () => {
		expect(await isAcademic("mail@" + randomString3 + ".edu")).to.equal(true);
	});
	it("Test mail@" + randomString4 + ".ac.ae", async () => {
		expect(await isAcademic("mail@" + randomString4 + ".ac.ae")).to.equal(true);
	});
	it("Test mail@www.duke.edu", async () => {
		expect(await isAcademic("mail@www.duke.edu")).to.equal(true);
	});
	it("Test www.enis.rnu.tn", async () => {
		expect(await isAcademic("www.enis.rnu.tn")).to.equal(true);
	});
	it("Test enis.rnu.tn", async () => {
		expect(await isAcademic("enis.rnu.tn")).to.equal(true);
	});
	it("Test mail@enis.rnu.tn", async () => {
		expect(await isAcademic("mail@enis.rnu.tn")).to.equal(true);
	});
	it("Test mail@www.enis.rnu.tn", async () => {
		expect(await isAcademic("mail@www.enis.rnu.tn")).to.equal(true);
	});
	it("Test " + randomString5 + ".rnu.tn", async () => {
		expect(await isAcademic(randomString5 + ".rnu.tn")).to.equal(false);
	});
	it("Test www." + randomString6 + ".rnu.tn", async () => {
		expect(await isAcademic("www." + randomString6 + ".rnu.tn")).to.equal(
			false
		);
	});
	it("Test lreilly@stanford.edu", async () => {
		expect(await isAcademic("lreilly@stanford.edu")).to.equal(true);
	});
	it("Test lreilly@strath.ac.uk", async () => {
		expect(await isAcademic("lreilly@strath.ac.uk")).to.equal(true);
	});
	it("Test lreilly@soft-eng.strath.ac.uk", async () => {
		expect(await isAcademic("lreilly@soft-eng.strath.ac.uk")).to.equal(true);
	});
	it("Test pedro@ugr.es", async () => {
		expect(await isAcademic("pedro@ugr.es")).to.equal(false);
	});
	it("Test lee@uottawa.ca", async () => {
		expect(await isAcademic("lee@uottawa.ca")).to.equal(true);
	});
	it("Test lee@leerilly.net", async () => {
		expect(await isAcademic("lee@leerilly.net")).to.equal(false);
	});
	it("Test harvard.edu", async () => {
		expect(await isAcademic("harvard.edu")).to.equal(true);
	});
	it("Test www.harvard.edu", async () => {
		expect(await isAcademic("www.harvard.edu")).to.equal(true);
	});
	it("Test http://www.harvard.edu", async () => {
		expect(await isAcademic("http://www.harvard.edu")).to.equal(true);
	});
	it("Test https://www.github.com", async () => {
		expect(await isAcademic("https://www.github.com")).to.equal(false);
	});
	it("Test http://www.rangers.co.uk", async () => {
		expect(await isAcademic("http://www.rangers.co.uk")).to.equal(false);
	});
	it('Test ""', async () => {
		expect(await isAcademic("")).to.equal(false);
	});
});

describe("getSchoolName Test Suite", () => {
	const randomString1: string = makeid(16);
	it("Test http://www.harvard.edu", async () => {
		expect(await getSchoolName("http://www.harvard.edu")).to.equal(
			"Harvard University"
		);
	});
	it("Test lreilly@cs.strath.ac.uk", async () => {
		expect(await getSchoolName("lreilly@cs.strath.ac.uk")).to.equal(
			"University of Strathclyde"
		);
	});
	it("Test enis.rnu.tn", async () => {
		expect(await getSchoolName("enis.rnu.tn")).to.equal(
			"National Engineering School of Sfax"
		);
	});
	it("Test http://www.rangers.co.uk", async () => {
		expect(await getSchoolName("http://www.rangers.co.uk")).to.equal(false);
	});
	it("Test mail@" + randomString1 + ".edu", async () => {
		expect(await getSchoolName("mail@" + randomString1 + ".edu")).to.equal(
			true
		);
	});
	it('Test ""', async () => {
		expect(await getSchoolName("")).to.equal(false);
	});
});

describe("getSchoolNames Test Suite", () => {
	const randomString1: string = makeid(16);
	const randomString2: string = makeid(16);
	const randomString3: string = makeid(16);
	const randomString4: string = makeid(16);
	it("Test lreilly@cs.strath.ac.uk", async () => {
		assert.deepStrictEqual(await getSchoolNames("lreilly@cs.strath.ac.uk"), [
			"University of Strathclyde",
			"uka tarsadia university,bardoli",
			"Pune university (INDIA)",
		]);
	});
	it("Test https://www.email.bbs1-gifhorn.txt", async () => {
		assert.deepStrictEqual(
			await getSchoolNames("https://www.email.bbs1-gifhorn.de"),
			["BBS1 Gifhorn", "Berufsbildene Schule 1 Gifhorn"]
		);
	});
	it("Test www." + randomString1 + ".edu", async () => {
		assert.deepStrictEqual(
			await getSchoolNames("www." + randomString1 + ".edu"),
			true
		);
	});
	it("Test www." + randomString2 + "." + randomString3, async () => {
		assert.strictEqual(
			await getSchoolNames("www." + randomString2 + "." + randomString3),
			false
		);
	});
	it("Test www." + randomString4 + ".net", async () => {
		assert.strictEqual(
			await getSchoolNames("www." + randomString4 + ".net"),
			false
		);
	});
	it("Test ftps://ftp.stanford.edu:22", async () => {
		assert.deepStrictEqual(await getSchoolNames("ftps://ftp.stanford.edu:22"), [
			"Stanford University",
		]);
	});
});
