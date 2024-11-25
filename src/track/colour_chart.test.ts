import { beforeEach, describe, expect, test } from "vitest";
import { DEFAULT_SWATCH } from "../constants";
import { colourLookup, Swatch } from "./colour_chart";

describe("colour chart", () => {
  test("should lookup colour for track", () => {
    const colourChart = colourLookup([]);

    expect(colourChart).not.toBeUndefined();
  });

  test("should return colour options for a track", () => {
    const colourChart = colourLookup([]);

    const swatch = colourChart("1");

    expect(swatch).not.toBeUndefined();
  });

  test("should return object with colour swatch", () => {
    const colourChart = colourLookup([]);

    const swatch = colourChart("1");

    expect(swatch).toHaveProperty("normal");
    expect(swatch).toHaveProperty("shaded");
    expect(swatch).toHaveProperty("text");
  });

  test("should return default colour swatch", () => {
    const colourChart = colourLookup([]);
    const swatch = colourChart("82");

    expect(swatch.shaded).toBe(DEFAULT_SWATCH.shaded);
  });
});

describe("supplied colour chart", () => {
  let colourChart: (k: string) => Swatch;

  const chart: Array<[string, string[]]> = [
    ["1", ["#00ffff", "#20dfdf", "#107070", "#ffffff"]],
    ["2", ["#d400ff", "#bf20df", "#601070", "#ffffff"]],
  ];

  beforeEach(() => {
    colourChart = colourLookup(chart);
  });

  test("should return default", () => {
    const swatch = colourChart("99");

    expect(swatch.highlight).toBe(DEFAULT_SWATCH.highlight);
  });

  test("should return chart's defined colour", () => {
    const swatch = colourChart("2");

    const [, [, normal]] = chart[1];

    expect(swatch.normal).toBe(normal);
  });
});
