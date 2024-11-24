import { beforeEach, describe, expect, test } from "vitest";
import { Straight, StraightSpec } from "./straight";

const spec: StraightSpec = {
  id: "99",
  catno: "ZZZ200",
  label: "200mm",
  length: 200,
};

let straight: Straight;

beforeEach(() => {
  straight = new Straight(spec);
  straight.setPosition({ x: 100, y: 100 });
});

describe("Move track around board", () => {
  test("should not be grabbed", () => {
    expect(straight.isGrabbed()).toBe(false);
  });

  test("should not be grabbed", () => {
    straight.onMouseDown({ x: 10, y: 10 });

    expect(straight.isGrabbed()).toBe(false);
  });

  test("should be grabbed", () => {
    straight.onMouseDown({ x: 110, y: 110 });

    expect(straight.isGrabbed()).toBe(true);
  });

  test("should not be dragged", () => {
    straight.onMouseDown({ x: 10, y: 10 });
    straight.dragGrabbed({ x: 210, y: 310 });

    expect(straight.x).toBe(100);
    expect(straight.y).toBe(100);
  });

  test("should be dragged", () => {
    straight.onMouseDown({ x: 110, y: 110 });
    straight.dragGrabbed({ x: 210, y: 310 });

    expect(straight.x).not.toBe(100);
    expect(straight.y).not.toBe(100);
  });

  test("should be offset by mousedown position", () => {
    straight.onMouseDown({ x: 110, y: 110 });
    straight.dragGrabbed({ x: 210, y: 310 });

    expect(straight.x).toBe(200);
    expect(straight.y).toBe(300);
  });

  test("should not move after mouse up", () => {
    straight.onMouseDown({ x: 110, y: 110 });
    straight.onMouseUp();

    straight.dragGrabbed({ x: 210, y: 310 });

    expect(straight.x).toBe(100);
    expect(straight.y).toBe(100);
  });
});
