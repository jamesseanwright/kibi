import run from "./interpreter.mjs";

describe("Kibi interpreter end-to-end tests", () => {
  describe("Simple program", () => {
    it("should return the expected result", () => {
      expect(run("(+ 2 2 2)")).toBe(6);
    });
  });

  describe("Nested expressions", () => {
    it("should return the expected result", () => {
      const program = '(+ 5 (- 7 4) (* 2 4 (/ 8 (+ 1 1))))';

      expect(run(program)).toBe(40);
    });
  });
});
