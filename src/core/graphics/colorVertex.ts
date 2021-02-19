namespace hyperEngine {
    /**
     * represents the data for a single vertex
     */
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
}
