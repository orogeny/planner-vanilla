import { Coords } from "../lib/coords";
import { SLEEPER_LENGTH } from "../constants";

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

  constructor(spec: StraightSpec) {
    this.trackId = spec.id;
    this.catno = spec.catno;
    this.label = spec.label;
    this.length = spec.length;
  }

  getDropOffset() {
    return {
      x: this.length / 2,
      y: this.width / 2,
    } as Coords;
  }

  setPosition(coords: Coords) {
    this.x = coords.x;
    this.y = coords.y;
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
