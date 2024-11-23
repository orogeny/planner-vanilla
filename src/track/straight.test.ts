import { describe, expect, test } from "vitest";
import { Straight } from "./straight";

describe("Straight", () => {
  test("should have catno and length", () => {
    const straight = new Straight("ZZ1001", 166);

    expect(straight).not.toBeUndefined();
    expect(straight.catno).toBe("ZZ1001");
    expect(straight.length).toBe(166);
  });
});
