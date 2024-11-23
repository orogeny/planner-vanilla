import { Coords } from "../lib/coords";

const SLEEPER_LENGTH = 22;

type StraightSpec = {
  id: string;
  catno: string;
  label: string;
  length: number;
};

class Straight {
  spec: StraightSpec;
  x = 0;
  y = 0;

  constructor(spec: StraightSpec) {
    this.spec = spec;
  }

  setPosition(coords: Coords) {
    this.x = coords.x;
    this.y = coords.y;
  }

  render(ctx: CanvasRenderingContext2D) {
    const { catno, length } = this.spec;

    ctx.beginPath();
    ctx.fillStyle = "#0000ff";
    ctx.rect(this.x, this.y, length, SLEEPER_LENGTH);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "18px arial";
    ctx.fillText(
      catno,
      this.x + length / 2,
      this.y + SLEEPER_LENGTH / 2,
      length,
    );
  }
}

export { Straight, type StraightSpec };
