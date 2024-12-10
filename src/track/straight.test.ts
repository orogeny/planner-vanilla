import { describe, expect, test } from "vitest";
import { Vector } from "../lib/vector";
import { Swatch } from "./colour_chart";
import { Straight, StraightSpec } from "./straight";

const spec: StraightSpec = {
  id: "1",
  catno: "TT8002",
  label: "166mm",
  length: 166,
};

describe("Straight", () => {
  test("should be assigned an id", () => {
    const straight = new Straight(spec);

    expect(straight).toHaveProperty("id");
    expect(straight.id).toHaveLength(21);
  });

  test("should have catno and length", () => {
    const straight = new Straight(spec);

    expect(straight).not.toBeUndefined();
    expect(straight.catno).toBe("TT8002");
    expect(straight.length).toBe(166);
  });

  test("should have default position", () => {
    const straight = new Straight(spec);

    expect(straight.position.x).toBe(0);
    expect(straight.position.y).toBe(0);
  });

  test("should have given position", () => {
    const straight = new Straight(spec);

    straight.setPosition(Vector.of(100, 200));

    expect(straight.position.x).toBe(100);
    expect(straight.position.y).toBe(200);
  });

  test("should not encompass outside coords", () => {
    const straight = new Straight(spec);
    straight.setPosition(Vector.of(100, 100));

    const above = Vector.of(150, 99);
    const below = Vector.of(150, 123);
    const left = Vector.of(99, 106);
    const right = Vector.of(267, 106);

    expect(straight.encompasses(above)).toBe(false);
    expect(straight.encompasses(below)).toBe(false);
    expect(straight.encompasses(left)).toBe(false);
    expect(straight.encompasses(right)).toBe(false);
  });

  test("should encompass coords on border", () => {
    const straight = new Straight(spec);
    straight.setPosition(Vector.of(100, 100));

    const top = Vector.of(150, 100);
    const bottom = Vector.of(150, 122);
    const left = Vector.of(100, 106);
    const right = Vector.of(266, 106);

    expect(straight.encompasses(top)).toBe(true);
    expect(straight.encompasses(bottom)).toBe(true);
    expect(straight.encompasses(left)).toBe(true);
    expect(straight.encompasses(right)).toBe(true);
  });

  test("should encompass coords inside", () => {
    const straight = new Straight(spec);
    straight.setPosition(Vector.of(100, 100));

    const centre = Vector.of(183, 111);
    expect(straight.encompasses(centre)).toBe(true);
  });

  test("should have a swatch property", () => {
    const straight = new Straight(spec);

    expect(straight).toHaveProperty("swatch");
  });

  test("should have default swatch", () => {
    const straight = new Straight(spec);

    expect(straight.swatch.text).toBe("#ffffff");
  });

  test("should replace default swatch", () => {
    const red: Swatch = {
      highlight: "#00ff00",
      normal: "#00ff01",
      shaded: "#00ff02",
      text: "#ffffff",
    };

    const straight = new Straight(spec);
    straight.setSwatch(red);

    expect(straight.swatch.shaded).toBe("#00ff02");
  });
});
