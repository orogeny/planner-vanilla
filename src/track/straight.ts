import { Coords } from "../lib/coords";

const SLEEPER_LENGTH = 22;

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
  x = 0;
  y = 0;

  constructor(spec: StraightSpec) {
    this.trackId = spec.id;
    this.catno = spec.catno;
    this.label = spec.label;
    this.length = spec.length;
  }

  setPosition(coords: Coords) {
    this.x = coords.x;
    this.y = coords.y;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = "#0000ff";
    ctx.rect(this.x, this.y, this.length, SLEEPER_LENGTH);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "18px arial";
    ctx.fillText(
      this.catno,
      this.x + this.length / 2,
      this.y + SLEEPER_LENGTH / 2,
      this.length,
    );
  }
}

export { Straight, type StraightSpec };
