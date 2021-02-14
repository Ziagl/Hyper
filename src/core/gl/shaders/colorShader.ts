namespace hyperEngine {
    export class ColorShader extends Shader {
        constructor() {
            super('basic');
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
}
