let canvas: HTMLCanvasElement;

function setup() {
  canvas = document.querySelector<HTMLCanvasElement>("canvas.board")!;

  const { width, height } = canvas.parentElement!.getBoundingClientRect();

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  canvas.width = width;
  canvas.height = height;
}

export { setup };
