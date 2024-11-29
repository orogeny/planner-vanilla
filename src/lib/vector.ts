class Vector {
  private readonly _x: number;
  private readonly _y: number;

  static of(x: number, y: number) {
    return new Vector(x, y);
  }

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get X() {
    return this._x;
  }

  get Y() {
    return this._y;
  }

  add(other: Vector) {
    return new Vector(this._x + other._x, this._y + other._y);
  }

  subtract(other: Vector) {
    return new Vector(this._x - other._x, this._y - other._y);
  }
}

export { Vector };
