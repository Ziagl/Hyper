namespace hyperEngine {
    export abstract class Primitive2D {
        protected _width: number;
        protected _height: number;
        protected _origin: Vector3 = Vector3.zero;
        protected _buffer: GLBuffer;
        protected _vertices: Vertex[] = [];

        constructor(width: number = 100, height: number = 100) {
            this._width = width;
            this._height = height;
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

        protected calculateVertices(): void {}
        protected recalculateVertices(): void {}
    }
}
