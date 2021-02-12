///<reference path="shader.ts"/>
namespace hyperEngine {
    export class BasicShader extends Shader {
        constructor() {
            super('basic');
            this.load(this.getVertexSource(), this.getFragmentSource());
        }

        private getVertexSource(): string {
            return `
attribute vec3 a_position;

void main() 
{
    gl_Position = vec4(a_position, 1.0);
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
}
