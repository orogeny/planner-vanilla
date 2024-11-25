import { beforeEach, describe, expect, test } from "vitest";
import { colourChart, Swatch } from "./colour_chart";

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

    expect(swatch.highlight).toBe("#0000ff");
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

    expect(swatch.highlight).toBe("#0000ff");
  });

  test("should return mangenta", () => {
    const swatch = colourLookup("2");

    expect(swatch.normal).toBe("#bf20df");
  });
});
