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

  test("should not be equal", () => {
    const v1 = new Vector(1, 1);
    const v2 = new Vector(1, 2);

    expect(v1.equals(v2)).toBe(false);
  });

  test("should be equal", () => {
    const v1 = new Vector(2, 2);
    const v2 = new Vector(2, 2);

    expect(v1.equals(v2)).toBe(true);
  });

  test("should return a Vector", () => {
    const vector = Vector.of(10, 20);

    expect(vector).not.toBeUndefined();
    expect(vector.x).toBe(10);
    expect(vector.y).toBe(20);
  });
});
