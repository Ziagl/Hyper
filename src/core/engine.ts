namespace hyperEngine {
    export class Engine {
        private _canvas: HTMLCanvasElement;
        private _projection: Matrix4;
        private _basicShader: BasicShader;
        private _colorShader: ColorShader;
        private _rectangle: Rectangle;
        private _triangle: Triangle;
        private _scene: Scene;

        constructor() {
            this._canvas = GLUtilities.initialize();

            // load shader
            this._basicShader = new BasicShader();
            this._colorShader = new ColorShader();

            // create scene
            //this._scene = new Scene();
            // load object
            this._rectangle = new Rectangle();
            this._triangle = new Triangle();

            this._projection = Matrix4.orthographic(
                0,
                this._canvas.width,
                0,
                this._canvas.height,
                -1.0,
                100.0
            );

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
            this.draw();
        }

        private draw(): void {
            gl.clear(gl.COLOR_BUFFER_BIT);

            // draw everything with basic shader
            this._basicShader.use();

            // set uniforms
            let projectionPosition = this._basicShader.getUniformLocation(
                'u_projection'
            );
            gl.uniformMatrix4fv(
                projectionPosition,
                false,
                new Float32Array(this._projection.data)
            );

            this._rectangle.draw(this._basicShader, this._projection);

            // draw everything with color shader
            this._colorShader.use();

            // set uniforms
            projectionPosition = this._colorShader.getUniformLocation(
                'u_projection'
            );
            gl.uniformMatrix4fv(
                projectionPosition,
                false,
                new Float32Array(this._projection.data)
            );

            this._triangle.draw(this._colorShader, this._projection);
        }
    }
}
