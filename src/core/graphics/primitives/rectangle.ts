namespace hyperEngine {
    export class Rectangle extends Primitive2D {
        constructor(width: number = 100, height: number = 100) {
            super(width, height);
            this.load();
        }

        protected calculateVertices(): void {
            // new coordinated for origin
            let minX = -(this._width * this._origin.x);
            let maxX = this._width * (1.0 - this._origin.x);

            let minY = -(this._height * this._origin.y);
            let maxY = this._height * (1.0 - this._origin.y);

            // add vertex data
            this._vertices = [
                // x y z
                new Vertex(minX, minY, 0),
                new Vertex(maxX, minY, 0),
                new Vertex(minX, maxY, 0),

                new Vertex(minX, maxY, 0),
                new Vertex(maxX, minY, 0),
                new Vertex(maxX, maxY, 0),
            ];

            for (let v of this._vertices) {
                this._buffer.pushBackData(v.toArray());
            }
            this._buffer.upload();
            this._buffer.unbind();
        }

        protected recalculateVertices(): void {
            // new coordinated for origin
            let minX = -(this._width * this._origin.x);
            let maxX = this._width * (1.0 - this._origin.x);

            let minY = -(this._height * this._origin.y);
            let maxY = this._height * (1.0 - this._origin.y);

            this._vertices[0].position.set(minX, minY);
            this._vertices[1].position.set(maxX, minY);
            this._vertices[2].position.set(minX, maxY);

            this._vertices[3].position.set(minX, maxY);
            this._vertices[4].position.set(maxX, minY);
            this._vertices[5].position.set(maxX, maxY);

            this._buffer.clearData();
            for (let v of this._vertices) {
                this._buffer.pushBackData(v.toArray());
            }
            this._buffer.upload();
            this._buffer.unbind();
        }
    }
}
