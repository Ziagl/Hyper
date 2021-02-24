import {gl} from "../gl"
import {ShaderManager} from "./shaderManager"

/**
 * represents a WebGL shader
 */
export abstract class Shader {
    private _name: string;
    private _program: WebGLProgram;
    // key-value store
    private _attributes: { [name: string]: number } = {};
    private _uniforms: { [name: string]: WebGLUniformLocation } = {};

    /**
     * creates a new shader
     * @param name the name of this shader
     */
    constructor(name: string) {
        this._name = name;
    }

    /**
     * the name of the shader
     */
    public get name(): string {
        return this._name;
    }

    /**
     * use this shader
     */
    public use(): void {
        gl.useProgram(this._program);
        
        // set uniforms
        let projectionPosition = this.getUniformLocation(
            'u_projection'
        );
        gl.uniformMatrix4fv(
            projectionPosition,
            false,
            new Float32Array(ShaderManager.projectionMatrix.data)
        );
    }

    /**
     * gets the location of an attribute with the provided name
     * @param name name of attribute to retrieve
     */
    public getAttributeLocation(name: string): number {
        if (this._attributes[name] === undefined) {
            throw new Error(
                "Unable to find attribute name '" +
                    name +
                    "' in shader named" +
                    this._name
            );
        }
        return this._attributes[name];
    }

    /**
     * gets the location of an uniform with the provided name
     * @param name name of uniform to retrieve
     */
    public getUniformLocation(name: string): WebGLUniformLocation {
        if (this._uniforms[name] === undefined) {
            throw new Error(
                "Unable to find uniform name '" +
                    name +
                    "' in shader named" +
                    this._name
            );
        }
        return this._uniforms[name];
    }

    /**
     * loads shaders from given sources
     * @param vertexSource the vertex shader source
     * @param fragmentSource the fragment shader source
     */
    protected load(vertexSource: string, fragmentSource: string): void {
        let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
        let fragmentShader = this.loadShader(
            fragmentSource,
            gl.FRAGMENT_SHADER
        );

        this._program = this.createProgram(vertexShader, fragmentShader);

        this.detectAttributes();
        this.detectUniforms();
    }

    private loadShader(source: string, shaderType: number): WebGLShader {
        let shader: WebGLShader = <WebGLShader>gl.createShader(shaderType);

        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        let error = gl.getShaderInfoLog(shader).trim();
        if (error !== '') {
            throw new Error(
                "Error compiling shader '" + this._name + "': " + error
            );
        }

        return shader;
    }

    private createProgram(
        vertexShader: WebGLShader,
        fragmentShader: WebGLShader
    ): WebGLProgram {
        let program: WebGLProgram = <WebGLProgram>gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        let error = gl.getProgramInfoLog(program).trim();
        if (error !== '') {
            throw new Error(
                "Error linking shader '" + this._name + "': " + error
            );
        }
        return program;
    }

    /**
     * gets all attributes from shader
     */
    private detectAttributes(): void {
        let attributeCount = gl.getProgramParameter(
            this._program,
            gl.ACTIVE_ATTRIBUTES
        );
        for (let i = 0; i < attributeCount; ++i) {
            let info: WebGLActiveInfo = <WebGLActiveInfo>(
                gl.getActiveAttrib(this._program, i)
            );
            if (!info) {
                break;
            }
            this._attributes[info.name] = gl.getAttribLocation(
                this._program,
                info.name
            );
        }
    }

    private detectUniforms(): void {
        let uniformCount = gl.getProgramParameter(
            this._program,
            gl.ACTIVE_UNIFORMS
        );
        for (let i = 0; i < uniformCount; ++i) {
            let info: WebGLActiveInfo = <WebGLActiveInfo>(
                gl.getActiveUniform(this._program, i)
            );
            if (!info) {
                break;
            }
            this._uniforms[info.name] = <WebGLUniformLocation>(
                gl.getUniformLocation(this._program, info.name)
            );
        }
    }
}

export class BasicShader extends Shader {
    constructor() {
        super('basic');
        this.load(this.getVertexSource(), this.getFragmentSource());
    }

    private getVertexSource(): string {
        return `
attribute vec3 a_position;

uniform mat4 u_projection;
uniform mat4 u_model;

void main() 
{
gl_Position = u_projection * u_model * vec4(a_position, 1.0);
}`;
    }

    private getFragmentSource(): string {
        return `
precision mediump float;

void main()
{
gl_FragColor = vec4(1.0);
}
`;
    }
}

export class ColorShader extends Shader {
    constructor() {
        super('color');
        this.load(this.getVertexSource(), this.getFragmentSource());
    }

    private getVertexSource(): string {
        return `
attribute vec3 a_position;
attribute vec4 a_color;

uniform mat4 u_projection;
uniform mat4 u_model;

varying vec4 v_color;

void main() 
{
gl_Position = u_projection * u_model * vec4(a_position, 1.0);
v_color = a_color;
}`;
    }

    private getFragmentSource(): string {
        return `
precision mediump float;

varying vec4 v_color;

void main()
{
gl_FragColor = v_color;
}
`;
    }
}

export class TextureShader extends Shader {
    constructor() {
        super('texture');
        this.load(this.getVertexSource(), this.getFragmentSource());
    }

    private getVertexSource(): string {
        return `
attribute vec3 a_position;
attribute vec2 a_texCoord;

uniform mat4 u_projection;
uniform mat4 u_model;

varying vec2 v_texCoord;

void main() 
{
gl_Position = u_projection * u_model * vec4(a_position, 1.0);
v_texCoord = a_texCoord;
}`;
    }

    private getFragmentSource(): string {
        return `
precision mediump float;

uniform vec4 u_tint;
uniform sampler2D u_diffuse;

varying vec2 v_texCoord;

void main()
{
gl_FragColor = u_tint * texture2D(u_diffuse, v_texCoord);
}
`;
    }
}
