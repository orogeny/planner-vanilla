import { describe, expect, test } from "vitest";
import { Vector } from "./vector";

describe("Vector", () => {
  test("should create a vector", () => {
    const vector = new Vector(3, 4);

    expect(vector).not.toBeUndefined();
    expect(vector.x).toBe(3);
    expect(vector.y).toBe(4);
  });

  test("should add vectors", () => {
    const v1 = new Vector(4, 3);

    const v2 = new Vector(12, 6);

    const sum = v1.add(v2);

    expect(sum.x).toBe(16);
    expect(sum.y).toBe(9);
  });

  test("should subtract vectors", () => {
    const v1 = new Vector(4, 3);

    const v2 = new Vector(12, 6);

    const diff = v1.subtract(v2);

    expect(diff.x).toBe(-8);
    expect(diff.y).toBe(-3);
  });
});
