import { beforeEach, describe, expect, test } from "vitest";
import { Straight } from "./straight";
import { TrackManager } from "./track_manager";

let manager: TrackManager;

const spec = { id: "0", catno: "TEST0200", label: "200mm", length: 200 };

beforeEach(() => {
  manager = new TrackManager([spec]);
  manager.add("0", { x: 100, y: 100 });
  manager.add("0", { x: 200, y: 110 });
});

describe("TrackManager z-index", () => {
  test("should not be any track", () => {
    expect(manager.getTrackAt({ x: 40, y: 50 })).toHaveLength(0);
  });

  test("should find single track", () => {
    expect(manager.getTrackAt({ x: 50, y: 100 })).toHaveLength(1);
  });

  test("should find two tracks", () => {
    expect(manager.getTrackAt({ x: 150, y: 108 })).toHaveLength(2);
  });
});

describe("Straight z-index", () => {
  test("should have default z-index of zero", () => {
    const straight = new Straight(spec);

    expect(straight.zIndex).toBe(0);
  });

  test("should have z-index set to ten", () => {
    const straight = new Straight(spec);
    straight.setZIndex(10);

    expect(straight.zIndex).toBe(10);
  });
});
