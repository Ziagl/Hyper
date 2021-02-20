///<reference path="primitives/primitive2D.ts"/>
namespace hyperEngine
{
    /**
     * represents a 2-dimensional sprite which is drawn on the screen.
     */
    export class Sprite extends Primitive2D
    {
        protected _name:string;
        protected _materialName:string;
        protected _material:Material;

        /**
         * creates a new sprite
         * @param name the name of this sprite
         * @param shaderName the name of used shader
         * @param materialName the name of the material to use with this sprite
         * @param width the width of this sprite
         * @param height the height of this sprite
         */
        constructor(name:string, shaderName:string, materialName:string, width:number = 100, height:number = 100)
        {
            super(height, width, shaderName);
            this._name = name;
            this.load();
            this._materialName = materialName;
            this._material = MaterialManager.getMaterial(this._materialName);
        }

        public get name():string
        {
            return this._name;
        }

        public destroy():void
        {
            this._buffer.destroy();
            MaterialManager.releaseMaterial(this._materialName);
            this._material = undefined;
            this._materialName = undefined;
        }

        /**
         * performs loading routines on this sprite
         */
        public load():void
        {
            this._buffer = new GLBuffer();

            // add attributes
            let positionAttribute = new AttributeInfo();
            positionAttribute.location = 0;
            positionAttribute.size = 3; // x, y, z
            this._buffer.addAttributeLocation(positionAttribute);

            let texCoordAttribute = new AttributeInfo();
            texCoordAttribute.location = 1;
            texCoordAttribute.size = 2; // u, v
            this._buffer.addAttributeLocation(texCoordAttribute);

            this.calculateVertices();
        }

        /**
         * updates this sprite
         * @param time 
         */
        public update(time:number):void
        {

        }

        /**
         * draws this sprite
         */
        public draw(shader:Shader, model:Matrix4):void
        {
            let modelLocation = shader.getUniformLocation("u_model");
            gl.uniformMatrix4fv(modelLocation, false, model.toFloat32Array());

            let colorLocation = shader.getUniformLocation("u_tint");
            gl.uniform4fv(colorLocation, this._material.tint.toFloat32Array());

            if(this._material.diffuseTexture !== undefined)
            {
                this._material.diffuseTexture.activateAndBind(0);
                let diffuseLocation = shader.getUniformLocation("u_diffuse");
                gl.uniform1i(diffuseLocation, 0);
            }

            this._buffer.bind();
            this._buffer.draw();
        }

        protected calculateVertices():void
        {
            // new coordinated for origin
            let minX = -(this._width * this._origin.x);
            let maxX = this._width * (1.0 - this._origin.x);

            let minY = -(this._height * this._origin.y);
            let maxY = this._height * (1.0 - this._origin.y);

            // add vertex data
            this._vertices = [
                // x y z u v
                new TextureVertex(minX, minY, 0, 0, 1.0),
                new TextureVertex(maxX, minY, 0, 1.0, 1.0),
                new TextureVertex(minX, maxY, 0, 0, 0),

                new TextureVertex(minX, maxY, 0, 0, 0),
                new TextureVertex(maxX, minY, 0, 1.0, 1.0),
                new TextureVertex(maxX, maxY, 0, 1.0, 0)
            ];

            for(let v of this._vertices)
            {
                this._buffer.pushBackData(v.toArray());
            }
            this._buffer.upload();
            this._buffer.unbind();
        }

        protected recalculateVertices():void
        {
            // new coordinated for origin
            let minX = -(this._width * this._origin.x);
            let maxX = this._width * (1.0 - this._origin.x);

            let minY = -(this._height * this._origin.y);
            let maxY = this._height * (1.0 - this._origin.y);

            this._vertices[0].position.set(minX, minY);
            this._vertices[1].position.set(maxX, minY);
            this._vertices[2].position.set(minX, maxY);

            this._vertices[3].position.set(minX, maxY);
            this._vertices[4].position.set(maxX, minY);
            this._vertices[5].position.set(maxX, maxY);

            this._buffer.clearData();
            for(let v of this._vertices)
            {
                this._buffer.pushBackData(v.toArray());
            }
            this._buffer.upload();
            this._buffer.unbind();
        }
    }
}