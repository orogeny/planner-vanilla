import { beforeEach, describe, expect, test } from "vitest";
import { COLOUR_CHART, SLEEPER_LENGTH } from "../constants";
import { Vector } from "../lib/vector";
import { StraightSpec } from "./straight";
import { TrackManager } from "./track_manager";

const catalog: StraightSpec[] = [
  {
    id: "1",
    catno: "TT8002",
    label: "166mm",
    length: 166,
  },
  {
    id: "2",
    catno: "TT8039",
    label: "332mm",
    length: 332,
  },
];

const position = Vector.of(100, 200);

let manager: TrackManager;

beforeEach(() => {
  manager = new TrackManager(catalog);
});

describe("TrackManager", () => {
  test("should have zero specs", () => {
    const trackManager = new TrackManager([]);

    expect(trackManager).not.toBeUndefined();
    expect(trackManager.catalog).toHaveLength(0);
  });

  test("should have two track specs", () => {
    expect(manager.catalog).toHaveLength(2);
  });

  test("should hold zero pieces of track", () => {
    expect(manager.tracks).toHaveLength(0);
  });
});

describe("add new track", () => {
  test("should hold one piece of track", () => {
    manager.add("1", position);

    expect(manager.tracks).toHaveLength(1);
  });

  test("should hold no unknown pieces of track", () => {
    manager.add("abc", position);

    expect(manager.tracks).toHaveLength(0);
  });

  test("should not return unknown track", () => {
    const track = manager.add("xyz", position);

    expect(track).toBeNull();
  });

  test("should return known track", () => {
    const track = manager.add("2", position);

    expect(track?.catno).toBe("TT8039");
  });

  test("should hold a single double length straight", () => {
    manager.add("2", position);

    expect(manager.tracks[0].catno).toBe("TT8039");
  });

  test("should contain track positioned offset from (150, 250)", () => {
    const expectedX = 150 - 166 / 2;
    const expectedY = 250 - SLEEPER_LENGTH / 2;
    manager.add("1", Vector.of(150, 250));

    const track = manager.tracks[0];

    expect(track.position.X).toBe(expectedX);
    expect(track.position.Y).toBe(expectedY);
  });
});

describe("colour chart", () => {
  test("should use COLOUR_CHART", () => {
    manager.add("1", position);

    const [, [highlight]] = COLOUR_CHART[0];

    expect(manager.tracks[0].swatch.highlight).toBe(highlight);
  });
});
