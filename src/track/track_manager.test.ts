import { beforeEach, describe, expect, test } from "vitest";
import { StraightSpec } from "./straight";
import { TrackManager } from "./track_manager";
import { Coords } from "../lib/coords";

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

const position: Coords = { x: 100, y: 200 };

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

    expect(track).toBeUndefined();
  });

  test("should hold a single double length straight", () => {
    manager.add("2", position);

    expect(manager.tracks[0].spec.catno).toBe("TT8039");
  });

  test("should return a piece of track", () => {
    const track = manager.add("1", position);

    expect(track?.spec.catno).toBe("TT8002");
  });

  test("should contain track positioned at (150, 250)", () => {
    manager.add("1", { x: 150, y: 250 });

    const track = manager.tracks[0];

    expect(track.x).toBe(150);
    expect(track.y).toBe(250);
  });
});
