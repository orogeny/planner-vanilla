import { StraightSpec } from "../track/straight";

function create(title: string, items: StraightSpec[]) {
  const paletteDiv = document.createElement("div");
  paletteDiv.classList.add("palette");

  const titleP = document.createElement("p");
  paletteDiv.appendChild(titleP);
  titleP.innerText = title;
  titleP.classList.add("title");

  const itemsUList = document.createElement("ul");
  paletteDiv.appendChild(itemsUList);
  itemsUList.classList.add("items");

  for (const item of items) {
    const itemLI = document.createElement("li");
    itemsUList.appendChild(itemLI);

    const itemDiv = document.createElement("div");
    itemLI.appendChild(itemDiv);
    itemDiv.classList.add("item", "track", "straight");
    itemDiv.draggable = true;
    itemDiv.dataset.trackId = item.id;

    itemDiv.ondragstart = (ev: DragEvent) => {
      ev.dataTransfer?.setData("text/plain", `track#${item.id}`);
    };

    const labelSpan = document.createElement("span");
    itemDiv.appendChild(labelSpan);
    labelSpan.classList.add("label");
    labelSpan.innerText = item.label;

    const catnoSpan = document.createElement("span");
    itemDiv.appendChild(catnoSpan);
    catnoSpan.classList.add("catno");
    catnoSpan.innerText = item.catno;
  }

  return paletteDiv;
}

export { create };
