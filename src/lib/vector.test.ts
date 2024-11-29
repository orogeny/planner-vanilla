import { describe, expect, test } from "vitest";
import { Vector } from "./vector";

describe("Vector", () => {
  test("should create a vector", () => {
    const vector = new Vector(3, 4);

    expect(vector).not.toBeUndefined();
    expect(vector.X).toBe(3);
    expect(vector.Y).toBe(4);
  });

  test("should add vectors", () => {
    const v1 = new Vector(4, 3);

    const v2 = new Vector(12, 6);

    const sum = v1.add(v2);

    expect(sum.X).toBe(16);
    expect(sum.Y).toBe(9);
  });

  test("should subtract vectors", () => {
    const v1 = new Vector(4, 3);

    const v2 = new Vector(12, 6);

    const diff = v1.subtract(v2);

    expect(diff.X).toBe(-8);
    expect(diff.Y).toBe(-3);
  });

  test("should return a Vector", () => {
    const vector = Vector.of(10, 20);

    expect(vector).not.toBeUndefined();
    expect(vector.X).toBe(10);
    expect(vector.Y).toBe(20);
  });
});
