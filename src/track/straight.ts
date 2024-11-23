const SLEEPER_LENGTH = 22;

type StraightSpec = {
  id: string;
  catno: string;
  label: string;
  length: number;
};

class Straight {
  spec: StraightSpec;

  constructor(spec: StraightSpec) {
    this.spec = spec;
  }

  render(ctx: CanvasRenderingContext2D) {
    const { catno, length } = this.spec;

    ctx.fillStyle = "#0000ff";
    ctx.rect(100, 100, length, SLEEPER_LENGTH);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "18px arial";
    ctx.fillText(catno, 100 + length / 2, 100 + SLEEPER_LENGTH / 2, length);
  }
}

export { Straight, type StraightSpec };
