import { nanoid } from "nanoid";
import { DEFAULT_SWATCH, SLEEPER_LENGTH } from "../constants";
import { Vector } from "../lib/vector";
import { Swatch } from "./colour_chart";

type StraightSpec = {
  id: string;
  catno: string;
  label: string;
  length: number;
};

class Straight {
  id: string;
  trackId: string;
  catno: string;
  label: string;
  length: number;
  width = SLEEPER_LENGTH;
  swatch: Swatch = DEFAULT_SWATCH;
  fillColour: keyof Swatch;
  textColour: keyof Swatch;
  zIndex = 0;
  centre: Vector;
  position: Vector;

  constructor(spec: StraightSpec) {
    this.id = nanoid();
    this.trackId = spec.id;
    this.catno = spec.catno;
    this.label = spec.label;
    this.length = spec.length;
    this.fillColour = "normal";
    this.textColour = "text";

    this.centre = Vector.of(this.length / 2, this.width / 2);
    this.position = Vector.of(0, 0);
  }

  setPosition(vector: Vector) {
    this.position = vector;
  }

  setSwatch(swatch: Swatch) {
    this.swatch = swatch;
  }

  setZIndex(zIndex: number) {
    this.zIndex = zIndex;
  }

  encompasses(vector: Vector) {
    if (
      vector.x < this.position.x ||
      vector.y < this.position.y ||
      vector.x > this.position.x + this.length ||
      vector.y > this.position.y + this.width
    ) {
      return false;
    }
    return true;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.fillStyle = this.swatch[this.fillColour];
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.length, this.width);
    ctx.fill();

    ctx.fillStyle = this.swatch[this.textColour];
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "18px arial";
    ctx.beginPath();
    ctx.fillText(
      this.catno,
      this.position.x + this.length / 2,
      this.position.y + this.width / 2,
      this.length,
    );

    ctx.restore();
  }
}

export { Straight, type StraightSpec };
