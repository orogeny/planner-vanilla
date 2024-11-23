function setup() {
  const items = document.querySelectorAll<HTMLDivElement>(
    "div.item.track[draggable='true']",
  );

  for (const item of items) {
    item.ondragstart = handleDragStart;
  }
}

// Drag Event handlers

function handleDragStart(ev: DragEvent) {
  const item = ev.currentTarget as HTMLDivElement;

  const trackId = item.dataset.trackId;

  if (trackId) {
    ev.dataTransfer!.setData("text/plain", `track#${trackId}`);
  }
}

export { setup };
