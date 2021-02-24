import {Vector3} from "../../math/vector3"
import {Matrix4} from "../../math/matrix4"
import {GLBuffer} from "../../gl/glBuffer"
import {Vertex} from "../vertex"
import {Shader} from "../../gl/shaders/shader"
import {AttributeInfo} from "../../gl/glBuffer"
import {gl} from "../../gl/gl"

export abstract class Primitive2D {
    protected _width: number;
    protected _height: number;
    protected _shaderName: string;
    protected _origin: Vector3 = Vector3.zero;
    protected _buffer: GLBuffer;
    protected _vertices: Vertex[] = [];

    constructor(
        width: number = 100,
        height: number = 100,
        shaderName: string = 'basic'
    ) {
        this._width = width;
        this._height = height;
        this._shaderName = shaderName;
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

        if (this._shaderName == 'color') {
            // add attributes
            let colorAttribute = new AttributeInfo();
            colorAttribute.location = 1;
            colorAttribute.size = 4; // r, g, b, a
            this._buffer.addAttributeLocation(colorAttribute);
        }

        if (this._shaderName == 'texture') {
            // add attributes
            let textureAttribute = new AttributeInfo();
            textureAttribute.location = 1;
            textureAttribute.size = 2; // u, v
            this._buffer.addAttributeLocation(textureAttribute);
        }

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
