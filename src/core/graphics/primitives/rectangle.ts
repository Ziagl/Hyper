import {Primitive2D} from "./primitive2D"
import {Vertex,ColorVertex,TextureVertex} from "../vertex"

export class Rectangle extends Primitive2D {
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
                    new Vertex(minX, maxY, 0),

                    new Vertex(minX, maxY, 0),
                    new Vertex(maxX, minY, 0),
                    new Vertex(maxX, maxY, 0),
                ];
                break;
            case 'color':
                // add vertex data
                this._vertices = [
                    // x y z r g b a
                    new ColorVertex(minX, minY, 0, 1, 0, 0, 1),
                    new ColorVertex(maxX, minY, 0, 0, 1, 0, 1),
                    new ColorVertex(minX, maxY, 0, 0, 0, 1, 1),

                    new ColorVertex(minX, maxY, 0, 0, 0, 1, 1),
                    new ColorVertex(maxX, minY, 0, 0, 1, 0, 1),
                    new ColorVertex(maxX, maxY, 0, 1, 0, 0, 1),
                ];
                break;
            case 'texture':
                // add vertex data
                this._vertices = [
                    // x y z u v
                    new TextureVertex(minX, minY, 0, 0, 0),
                    new TextureVertex(maxX, minY, 0, 1, 0),
                    new TextureVertex(minX, maxY, 0, 0, 1),

                    new TextureVertex(minX, maxY, 0, 0, 1),
                    new TextureVertex(maxX, minY, 0, 1, 0),
                    new TextureVertex(maxX, maxY, 0, 1, 1),
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
