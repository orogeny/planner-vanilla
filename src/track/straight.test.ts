import { describe, expect, test } from "vitest";
import { Straight, StraightSpec } from "./straight";

const spec: StraightSpec = {
  id: "1",
  catno: "TT8002",
  label: "166mm",
  length: 166,
};

describe("Straight", () => {
  test("should have catno and length", () => {
    const straight = new Straight(spec);

    expect(straight).not.toBeUndefined();
    expect(straight.spec.catno).toBe("TT8002");
    expect(straight.spec.length).toBe(166);
  });
});
