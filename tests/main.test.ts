import { expect } from "chai";
import { isAcademic } from "./../src";

describe("isAcademic Test Suite", function() {
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
})