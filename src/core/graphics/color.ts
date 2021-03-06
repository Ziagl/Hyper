/**
 * clas that represents a RGB color
 */
export class Color {
    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;

    constructor(
        r: number = 255,
        g: number = 255,
        b: number = 255,
        a: number = 255
    ) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }

    public get r(): number {
        return this._r;
    }

    public get rfload(): number {
        return this.r / 255.0;
    }

    public set r(value: number) {
        this._r = value;
    }

    public get g(): number {
        return this._g;
    }

    public get gfload(): number {
        return this.g / 255.0;
    }

    public set g(value: number) {
        this._g = value;
    }

    public get b(): number {
        return this._b;
    }

    public get bfload(): number {
        return this.b / 255.0;
    }

    public set b(value: number) {
        this._b = value;
    }

    public get a(): number {
        return this._a;
    }

    public get afload(): number {
        return this.a / 255.0;
    }

    public set a(value: number) {
        this._a = value;
    }

    public toArray(): number[] {
        return [this._r, this._g, this._b, this._a];
    }

    public toFloatArray(): number[] {
        return [
            this._r / 255.0,
            this._g / 255.0,
            this._b / 255.0,
            this._a / 255.0,
        ];
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toFloatArray());
    }

    public static get white(): Color {
        return new Color(255, 255, 255, 255);
    }

    public static get black(): Color {
        return new Color(0, 0, 0, 255);
    }

    public static get red(): Color {
        return new Color(255, 0, 0, 255);
    }

    public static get green(): Color {
        return new Color(0, 255, 0, 255);
    }

    public static get blue(): Color {
        return new Color(0, 0, 255, 255);
    }
}
