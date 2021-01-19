import { expect } from "chai";
import { isAcademic } from "./../src";

function makeid(length: number): string {
	let result: string = "";
	const characters: string =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength: number = characters.length;
	for (let i: number = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

describe("isAcademic Test Suite", function () {
	it("Test berlin.de", () => {
		expect(isAcademic("berlin.de")).to.equal(true);
	});
	it("Test stanford.edu", () => {
		expect(isAcademic("stanford.edu")).to.equal(true);
	});
	it("Test github.com", () => {
		expect(isAcademic("github.com")).to.equal(false);
	});
	it("Test itb.edu.bn", () => {
		expect(isAcademic("itb.edu.bn")).to.equal(true);
	});
	it("Test itb.bn", () => {
		expect(isAcademic("itb.bn")).to.equal(false);
	});
	it("Test yorkuniversity.us", () => {
		expect(isAcademic("yorkuniversity.us")).to.equal(true);
	});
	const randomString1: string = makeid(16);
	const randomString2: string = makeid(16);
	const randomString3: string = makeid(16);
	it("Test " + randomString1 + ".edu", () => {
		expect(isAcademic(randomString1 + ".edu")).to.equal(true);
	});
	it("Test " + randomString2 + ".ac.ae", () => {
		expect(isAcademic(randomString2 + ".ac.ae")).to.equal(true);
	});
});
