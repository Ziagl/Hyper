namespace hyperEngine {
    export class Rectangle {
        protected _width: number;
        protected _height: number;
        protected _origin: Vector3 = Vector3.zero;
        protected _buffer: GLBuffer;
        protected _vertices: Vertex[] = [];

        constructor(width: number = 100, height: number = 100) {
            this._width = width;
            this._height = height;
            this.load();
        }

        public get origin(): Vector3 {
            return this._origin;
        }

        public set origin(value: Vector3) {
            this._origin = value;
            this.recalculateVertices();
        }

        public destroy(): void {
            this._buffer.destroy();
        }

        public load(): void {
            this._buffer = new GLBuffer();
            // add attributes
            let positionAttribute = new AttributeInfo();
            positionAttribute.location = 0;
            positionAttribute.size = 3; // x, y, z
            this._buffer.addAttributeLocation(positionAttribute);

            this.calculateVertices();
        }

        public update(time: number): void {}

        public draw(shader: Shader, model: Matrix4): void {
            let modelLocation = shader.getUniformLocation('u_model');
            gl.uniformMatrix4fv(modelLocation, false, model.toFloat32Array());

            this._buffer.bind();
            this._buffer.draw();
        }

        protected calculateVertices(): void {
            // new coordinated for origin
            let minX = -(this._width * this._origin.x);
            let maxX = this._width * (1.0 - this._origin.x);

            let minY = -(this._height * this._origin.y);
            let maxY = this._height * (1.0 - this._origin.y);

            // add vertex data
            this._vertices = [
                // x y z u v
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
