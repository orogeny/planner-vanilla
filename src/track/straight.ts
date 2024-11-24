import { SLEEPER_LENGTH } from "../constants";
import { Coords } from "../lib/coords";

type StraightSpec = {
  id: string;
  catno: string;
  label: string;
  length: number;
};

class Straight {
  trackId: string;
  catno: string;
  label: string;
  length: number;
  width = SLEEPER_LENGTH;
  x = 0;
  y = 0;

  mouseOffset?: Coords;

  constructor(spec: StraightSpec) {
    this.trackId = spec.id;
    this.catno = spec.catno;
    this.label = spec.label;
    this.length = spec.length;
  }

  dragGrabbed(coords: Coords) {
    if (this.mouseOffset !== undefined) {
      this.setPosition({
        x: coords.x + this.mouseOffset.x,
        y: coords.y + this.mouseOffset.y,
      });
    }
  }

  setPosition(coords: Coords) {
    this.x = coords.x;
    this.y = coords.y;
  }

  getDropOffset() {
    return {
      x: this.length / 2,
      y: this.width / 2,
    } as Coords;
  }

  isGrabbed() {
    return this.mouseOffset !== undefined;
  }

  onMouseDown(coords: Coords) {
    if (this.encompasses(coords)) {
      this.mouseOffset = { x: this.x - coords.x, y: this.y - coords.y };
    }
  }

  onMouseUp() {
    this.mouseOffset = undefined;
  }

  encompasses(coords: Coords) {
    const { x, y } = coords;

    if (
      x < this.x ||
      y < this.y ||
      x > this.x + this.length ||
      y > this.y + this.width
    ) {
      return false;
    }
    return true;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = "#0000ff";
    ctx.rect(this.x, this.y, this.length, this.width);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "18px arial";
    ctx.fillText(
      this.catno,
      this.x + this.length / 2,
      this.y + this.width / 2,
      this.length,
    );
  }
}

export { Straight, type StraightSpec };
