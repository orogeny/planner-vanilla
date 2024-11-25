import { beforeEach, describe, expect, test } from "vitest";
import { TrackManager } from "./track_manager";

let manager: TrackManager;

const spec = { id: "0", catno: "TEST0200", label: "200mm", length: 200 };

beforeEach(() => {
  manager = new TrackManager([spec]);
  manager.add("0", { x: 100, y: 100 });
  manager.add("0", { x: 200, y: 110 });

  console.log(`first:(${manager.tracks[0].x}, ${manager.tracks[0].y})`);
  console.log(`second:(${manager.tracks[1].x}, ${manager.tracks[1].y})`);
});

describe("z-index", () => {
  test("should not be any track", () => {
    expect(manager.getTracksAt({ x: 40, y: 50 })).toHaveLength(0);
  });

  test("should find single track", () => {
    expect(manager.getTracksAt({ x: 50, y: 100 })).toHaveLength(1);
  });

  test("should find two tracks", () => {
    expect(manager.getTracksAt({ x: 150, y: 108 })).toHaveLength(2);
  });
});
