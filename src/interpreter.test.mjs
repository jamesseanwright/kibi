import run from "./interpreter.mjs";

describe("Kibi interpreter end-to-end tests", () => {
  describe("Simple program", () => {
    it("should return the expected result", () => {
      expect(run("(+ 2 2 2)")).toBe("6");
    });
  });
});
