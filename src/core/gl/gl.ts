namespace hyperEngine {
    export var gl: WebGLRenderingContext;

    export class GLUtilities {
        public static initialize(elementId?: string): HTMLCanvasElement {
            let canvas: HTMLCanvasElement;

            // create canvas of get it from given id
            if (elementId !== undefined) {
                canvas = document.getElementById(
                    elementId
                ) as HTMLCanvasElement;
                if (canvas === undefined) {
                    throw new Error(
                        'Cannot find a canvas element named: ' + elementId
                    );
                }
            } else {
                canvas = document.createElement('canvas') as HTMLCanvasElement;
                document.body.appendChild(canvas).setAttribute('id', 'display');
            }

            // create WebGL rendering context
            gl = <WebGLRenderingContext>canvas.getContext('webgl');
            if (gl === undefined || gl === null) {
                // support for IE
                gl = <WebGLRenderingContext>(
                    canvas.getContext('experimental-webgl')
                );
                if (gl === undefined || gl === null) {
                    throw new Error('Unable to initialize WebGL!');
                }
            }

            return canvas;
        }
    }
}
