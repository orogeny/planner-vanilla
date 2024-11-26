import { describe, expect, test } from "vitest";
import { SLEEPER_LENGTH } from "../constants";
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

    expect(straight.x).toBe(0);
    expect(straight.y).toBe(0);
  });

  test("should have given position", () => {
    const straight = new Straight(spec);

    straight.setPosition({ x: 100, y: 200 });

    expect(straight.x).toBe(100);
    expect(straight.y).toBe(200);
  });

  test("should have offset in centre", () => {
    const straight = new Straight(spec);

    const offset = straight.getDropOffset();

    expect(offset.x).toBe(spec.length / 2);
    expect(offset.y).toBe(SLEEPER_LENGTH / 2);
  });

  test("should not encompass outside coords", () => {
    const straight = new Straight(spec);
    straight.setPosition({ x: 100, y: 100 });

    const above = { x: 150, y: 99 };
    const below = { x: 150, y: 123 };
    const left = { x: 99, y: 106 };
    const right = { x: 267, y: 106 };

    expect(straight.encompasses(above)).toBe(false);
    expect(straight.encompasses(below)).toBe(false);
    expect(straight.encompasses(left)).toBe(false);
    expect(straight.encompasses(right)).toBe(false);
  });

  test("should encompass coords on border", () => {
    const straight = new Straight(spec);
    straight.setPosition({ x: 100, y: 100 });

    const top = { x: 150, y: 100 };
    const bottom = { x: 150, y: 122 };
    const left = { x: 100, y: 106 };
    const right = { x: 266, y: 106 };

    expect(straight.encompasses(top)).toBe(true);
    expect(straight.encompasses(bottom)).toBe(true);
    expect(straight.encompasses(left)).toBe(true);
    expect(straight.encompasses(right)).toBe(true);
  });

  test("should encompass coords inside", () => {
    const straight = new Straight(spec);
    straight.setPosition({ x: 100, y: 100 });

    const centre = { x: 183, y: 111 };
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
