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

  test("should have default position", () => {
    const straight = new Straight(spec);

    expect(straight.x).toBe(0);
    expect(straight.y).toBe(0);
  });

  test("should have given position", () => {
    const straight = new Straight(spec);

    straight.setPosition({ x: 100, y: 200 });

    expect(straight.x).toBe(100);
    expect(straight.y).toBe(200);
  });
});
