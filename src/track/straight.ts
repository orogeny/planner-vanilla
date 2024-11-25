import { DEFAULT_SWATCH, SLEEPER_LENGTH } from "../constants";
import { Coords } from "../lib/coords";
import { Swatch } from "./colour_chart";

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
  swatch: Swatch = DEFAULT_SWATCH;
  fillColour: keyof Swatch;
  textColour: keyof Swatch;
  indexZ = 0;

  x = 0;
  y = 0;

  mouseOffset?: Coords;

  constructor(spec: StraightSpec) {
    this.trackId = spec.id;
    this.catno = spec.catno;
    this.label = spec.label;
    this.length = spec.length;
    this.fillColour = "normal";
    this.textColour = "text";
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

  setSwatch(swatch: Swatch) {
    this.swatch = swatch;
  }

  setIndexZ(indexZ: number) {
    this.indexZ = indexZ;
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
      this.fillColour = "highlight";
    }
  }

  onMouseUp() {
    this.mouseOffset = undefined;
    this.fillColour = "normal";
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
    ctx.save();

    ctx.fillStyle = this.swatch[this.fillColour];
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.length, this.width);
    ctx.fill();

    ctx.fillStyle = this.swatch[this.textColour];
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "18px arial";
    ctx.beginPath();
    ctx.fillText(
      this.catno,
      this.x + this.length / 2,
      this.y + this.width / 2,
      this.length,
    );

    ctx.restore();
  }
}

export { Straight, type StraightSpec };
