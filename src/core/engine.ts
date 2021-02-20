namespace hyperEngine {
    export class Engine {
        private _canvas: HTMLCanvasElement;
        private _projection: Matrix4;
        private _basicShader: BasicShader;
        private _colorShader: ColorShader;
        private _previousTime: number = 0;

        constructor() {
            this._canvas = GLUtilities.initialize();
            AssetManager.initialize();
            SceneManager.initialize();

            // load materials
            MaterialManager.registerMaterial(new Material("wooden-box", "assets/textures/wooden-box.jpg", Color.white));

            this._projection = Matrix4.orthographic(
                0,
                this._canvas.width,
                0,
                this._canvas.height,
                -1.0,
                100.0
            );

            // load scene
            SceneManager.changeScene(0);

            gl.clearColor(0, 0, 0, 1);

            // enable transparancy
            //gl.enable(gl.BLEND);
            //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        }

        public start(): void {
            this.resize();
            var gameloop = () => {
                this.update();
                requestAnimationFrame(gameloop);
            };
            gameloop();
        }

        public resize(): void {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;

                gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
                this._projection = Matrix4.orthographic(
                    0,
                    this._canvas.width,
                    0,
                    this._canvas.height,
                    -1.0,
                    100.0
                );
            }
        }

        private update(): void {
            let delta = performance.now() - this._previousTime;
            MessageBus.update(delta);
            SceneManager.update(delta);

            this._previousTime = performance.now();

            this.draw();
        }

        private draw(): void {
            gl.clear(gl.COLOR_BUFFER_BIT);

            ShaderManager.projectionMatrix = this._projection;
            SceneManager.render();
        }
    }
}
