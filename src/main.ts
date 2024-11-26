import * as board from "./components/board";
import * as palette from "./components/palette";
import { TRACK_CATALOG } from "./constants";

window.onload = setup;

function setup() {
  board.setup(TRACK_CATALOG);
  palette.setup();
}
