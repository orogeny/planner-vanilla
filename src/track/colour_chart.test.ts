import { beforeEach, describe, expect, test } from "vitest";
import { colourChart, Swatch } from "./colour_chart";
import { DEFAULT_SWATCH } from "../constants";

describe("colour chart", () => {
  test("should lookup colour for track", () => {
    const colourLookup = colourChart([]);

    expect(colourLookup).not.toBeUndefined();
  });

  test("should return colour options for a track", () => {
    const colourLookup = colourChart([]);

    const swatch = colourLookup("1");

    expect(swatch).not.toBeUndefined();
  });

  test("should return object with colour swatch", () => {
    const colourLookup = colourChart([]);

    const swatch = colourLookup("1");

    expect(swatch).toHaveProperty("normal");
    expect(swatch).toHaveProperty("shaded");
    expect(swatch).toHaveProperty("text");
  });

  test("should return default colour swatch", () => {
    const colourLookup = colourChart([]);
    const swatch = colourLookup("82");

    expect(swatch.shaded).toBe(DEFAULT_SWATCH.shaded);
  });
});

describe("supplied colour chart", () => {
  let colourLookup: (k: string) => Swatch;

  const chart: Array<[string, string[]]> = [
    ["1", ["#00ffff", "#20dfdf", "#107070", "#ffffff"]],
    ["2", ["#d400ff", "#bf20df", "#601070", "#ffffff"]],
  ];

  beforeEach(() => {
    colourLookup = colourChart(chart);
  });

  test("should return default", () => {
    const swatch = colourLookup("99");

    expect(swatch.highlight).toBe(DEFAULT_SWATCH.highlight);
  });

  test("should return chart's defined colour", () => {
    const swatch = colourLookup("2");

    const [, [, normal]] = chart[1];

    expect(swatch.normal).toBe(normal);
  });
});
