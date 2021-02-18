///<reference path="shader.ts"/>
///<reference path="shaderManager.ts"/>
namespace hyperEngine {
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
}
