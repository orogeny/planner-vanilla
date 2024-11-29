import { StraightSpec } from "../track/straight";
import * as palette from "./palette";

function setup(trackCatalog: StraightSpec[]) {
  const sidebar = document.querySelector<HTMLDivElement>(".sidebar");

  if (sidebar !== null) {
    const straights = palette.create("Straights", trackCatalog);
    sidebar.appendChild(straights);
  }
}

export { setup };
