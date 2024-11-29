import * as board from "./components/board";
import * as sidebar from "./components/sidebar";
import { TRACK_CATALOG } from "./constants";

window.onload = setup;

function setup() {
  board.setup(TRACK_CATALOG);
  sidebar.setup(TRACK_CATALOG);
}
