///<reference path="primitive2D.ts"/>
namespace hyperEngine {
    export class Triangle extends Primitive2D {
        constructor(width: number = 100, height: number = 100) {
            super(width, height);
            this.load();
        }

        public load(): void {
            this._buffer = new GLBuffer();
            // add attributes
            let positionAttribute = new AttributeInfo();
            positionAttribute.location = 0;
            positionAttribute.size = 3; // x, y, z
            this._buffer.addAttributeLocation(positionAttribute);

            // add attributes
            let colorAttribute = new AttributeInfo();
            colorAttribute.location = 1;
            colorAttribute.size = 4; // r, g, b, a
            this._buffer.addAttributeLocation(colorAttribute);

            this.calculateVertices();
        }

        protected calculateVertices(): void {
            // new coordinated for origin
            let minX = -(this._width * this._origin.x);
            let maxX = this._width * (1.0 - this._origin.x);

            let minY = -(this._height * this._origin.y);
            let maxY = this._height * (1.0 - this._origin.y);

            // add vertex data
            this._vertices = [
                // x y z r g b a
                new Vertex(minX, minY, 0, 0, 0, 1, 0, 0, 1),
                new Vertex(maxX, minY, 0, 0, 0, 0, 1, 0, 1),
                new Vertex(maxX / 2, maxY, 0, 0, 0, 0, 0, 1, 1),
            ];

            for (let v of this._vertices) {
                this._buffer.pushBackData(v.toArrayWithColor());
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
            this._vertices[2].position.set(maxX / 2, maxY);

            this._buffer.clearData();
            for (let v of this._vertices) {
                this._buffer.pushBackData(v.toArrayWithColor());
            }
            this._buffer.upload();
            this._buffer.unbind();
        }
    }
}
