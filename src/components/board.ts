let canvas: HTMLCanvasElement;

function setup() {
  setupCanvas();
  setupDragHandlers();
}

// Canvas Setup

function setupCanvas() {
  canvas = document.querySelector<HTMLCanvasElement>("canvas.board")!;

  const { width, height } = canvas.parentElement!.getBoundingClientRect();

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  canvas.width = width;
  canvas.height = height;
}

// Drag Event handlers

function setupDragHandlers() {
  canvas.ondragover = (ev: DragEvent) => {
    ev.preventDefault();

    ev.dataTransfer!.dropEffect = "copy";
  };

  canvas.ondrop = (ev: DragEvent) => {
    const dropped = ev.dataTransfer?.getData("text/plain");

    if (dropped) {
      const [kind, id] = dropped.split("#");

      console.log(`dropped kind: ${kind} id: ${id}`);
    }
  };
}

export { setup };
