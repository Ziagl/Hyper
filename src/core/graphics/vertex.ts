import { Vector2 } from "../math/vector2";
import {Vector3} from "../math/vector3"
import { Color } from "./color";
/**
 * represents the data for a single vertex
 */
export class Vertex {
    public position: Vector3 = Vector3.zero;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }

    public toArray(): number[] {
        let array: number[] = [];

        array = array.concat(this.position.toArray());

        return array;
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
}

export class ColorVertex extends Vertex {
    public color: Color = Color.white;

    constructor(
        x: number = 0,
        y: number = 0,
        z: number = 0,
        r: number = 0,
        g: number = 0,
        b: number = 0,
        a: number = 0
    ) {
        super(x, y, z);
        this.color.r = r;
        this.color.g = g;
        this.color.b = b;
        this.color.a = a;
    }

    public toArray(): number[] {
        let array: number[] = [];

        array = array.concat(this.position.toArray());
        array = array.concat(this.color.toArray());

        return array;
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
}

export class TextureVertex extends Vertex {
    public texCoords: Vector2 = Vector2.zero;

    constructor(
        x: number = 0,
        y: number = 0,
        z: number = 0,
        tu: number = 0,
        tv: number = 0
    ) {
        super(x, y, z);
        this.texCoords.x = tu;
        this.texCoords.y = tv;
    }

    public toArray(): number[] {
        let array: number[] = [];

        array = array.concat(this.position.toArray());
        array = array.concat(this.texCoords.toArray());

        return array;
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
}
