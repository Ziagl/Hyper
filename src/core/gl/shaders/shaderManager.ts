namespace hyperEngine {
    export class ShaderManager {
        private static _registeredShaders: {
            [type: string]: Shader;
        } = {};
        public static projectionMatrix:Matrix4;
        public static modelMatrix:Matrix4;
        public static viewMatrix:Matrix4;

        public static registerShader(shader: Shader): void {
            ShaderManager._registeredShaders[shader.name] = shader;
        }

        public static getFromJson(name: string): Shader {
            if (ShaderManager._registeredShaders[name] !== undefined) {
                return ShaderManager._registeredShaders[name];
            } else {
                let shader: Shader;
                switch (name) {
                    case 'color':
                        shader = new ColorShader();
                        ShaderManager.registerShader[name] = shader;
                        return shader;
                    case 'basic':
                        shader = new BasicShader();
                        ShaderManager.registerShader[name] = shader;
                        return shader;
                }
            }

            throw new Error(
                'Shader manager error - shader name is missing or shader is not registered with this name.'
            );
        }
    }
}
