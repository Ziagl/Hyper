namespace hyperEngine {
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
}
