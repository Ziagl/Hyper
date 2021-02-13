namespace hyperEngine {
    export class Engine {
        private _canvas: HTMLCanvasElement;
        private _projection: Matrix4;
        private _basicShader: BasicShader;
        private _rectangle: Rectangle;
        private _triangle: Triangle;

        constructor() {
            this._canvas = GLUtilities.initialize();

            // load shader
            this._basicShader = new BasicShader();
            this._basicShader.use();

            // load object
            this._rectangle = new Rectangle(0.5, 0.5);
            this._rectangle.origin = new Vector3(1.0, 1.0);
            this._triangle = new Triangle(0.5, 0.5);

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

            // set uniforms
            let projectionPosition = this._basicShader.getUniformLocation(
                'u_projection'
            );
            //###todo set projection matrix to identity matrix
            this._projection = Matrix4.identity();
            gl.uniformMatrix4fv(
                projectionPosition,
                false,
                new Float32Array(this._projection.data)
            );

            this._rectangle.draw(this._basicShader, this._projection);
            this._triangle.draw(this._basicShader, this._projection);
        }
    }
}
