import * as board from "./components/board";
import * as palette from "./components/palette";

window.onload = setup;

function setup() {
  board.setup();
  palette.setup();
}
