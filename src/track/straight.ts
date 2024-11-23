const SLEEPER_LENGTH = 22;

class Straight {
  catno: string;
  length: number;

  constructor(catno: string, length: number) {
    this.catno = catno;
    this.length = length;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#0000ff";
    ctx.rect(100, 100, this.length, SLEEPER_LENGTH);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "18px arial";
    ctx.fillText(
      this.catno,
      100 + this.length / 2,
      100 + SLEEPER_LENGTH / 2,
      this.length,
    );
  }
}

export { Straight };
