export namespace Vector {
  export type Vector = {
    x: number;
    y: number;
  };

  export function add(vector1: Vector, vector2: Vector) {
    const result: Vector = { x: vector1.x + vector2.x, y: vector1.y + vector2.y };
    return result;
  }

  export function scale(vector: Vector, scalar: number) {
    const result: Vector = { x: vector.x * scalar, y: vector.y * scalar };
    return result;
  }
}
