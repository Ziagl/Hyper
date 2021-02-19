///<reference path="primitive2D.ts"/>
namespace hyperEngine {
    export class Triangle extends Primitive2D {
        constructor(
            width: number = 100,
            height: number = 100,
            shaderName: string = 'basic'
        ) {
            super(width, height, shaderName);
            this.load();
        }

        protected calculateVertices(): void {
            // new coordinated for origin
            let minX = -(this._width * this._origin.x);
            let maxX = this._width * (1.0 - this._origin.x);

            let minY = -(this._height * this._origin.y);
            let maxY = this._height * (1.0 - this._origin.y);

            switch (this._shaderName) {
                case 'basic':
                    // add vertex data
                    this._vertices = [
                        // x y z
                        new Vertex(minX, minY, 0),
                        new Vertex(maxX, minY, 0),
                        new Vertex((minX + maxX) * 0.5, maxY, 0),
                    ];
                    break;
                case 'color':
                    // add vertex data
                    this._vertices = [
                        // x y z r g b a
                        new ColorVertex(minX, minY, 0, 1, 0, 0, 1),
                        new ColorVertex(maxX, minY, 0, 0, 1, 0, 1),
                        new ColorVertex(
                            (minX + maxX) * 0.5,
                            maxY,
                            0,
                            0,
                            0,
                            1,
                            1
                        ),
                    ];
                    break;
                case 'texture':
                    // add vertex data
                    this._vertices = [
                        // x y z u v
                        new TextureVertex(minX, minY, 0, 0, 0),
                        new TextureVertex(maxX, minY, 0, 1, 0),
                        new TextureVertex((minX + maxX) * 0.5, maxY, 0, 0.5, 1),
                    ];
                    break;
            }

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
            this._vertices[2].position.set(maxX / 2, maxY);

            this._buffer.clearData();
            for (let v of this._vertices) {
                this._buffer.pushBackData(v.toArray());
            }
            this._buffer.upload();
            this._buffer.unbind();
        }
    }
}
