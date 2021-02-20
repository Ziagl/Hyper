///<reference path="componentManager.ts"/>
///<reference path="baseComponent.ts"/>

namespace hyperEngine
{
    export class SpriteComponentData implements IComponentData
    {
        public name:string;
        public materialName:string;
        public origin:Vector3 = Vector3.zero;
        public shader: string;

        public setFromJson(json:any):void
        {
            if(json.name !== undefined)
            {
                this.name = String(json.name);
            }
            if(json.materialName !== undefined)
            {
                this.materialName = String(json.materialName);
            }
            if(json.origin !== undefined)
            {
                this.origin.setFromJson(json.origin);
            }
            if (json.shader !== undefined) {
                this.shader = String(json.shader);
            }
        }
    }

    export class SpriteComponentBuilder implements IComponentBuilder
    {
        public get type():string
        {
            return "sprite";
        }

        public buildFromJson(json:any):IComponent
        {
            let data = new SpriteComponentData();
            data.setFromJson(json);
            return new SpriteComponent(data);
        }
    }

    export class SpriteComponent extends BaseComponent
    {
        private _sprite:Sprite;
        private _shader: Shader;

        constructor(data:SpriteComponentData)
        {
            super(data);

            this._shader = new BasicShader();
            if (data.shader !== undefined) {
                this._shader = ShaderManager.getFromJson(data.shader);
            }
            this._sprite = new Sprite(data.name, this._shader.name, data.materialName);
            if(!data.origin.equals(Vector3.zero))
            {
                this._sprite.origin.copyFrom(data.origin);
            }
        }

        public load():void
        {
            this._sprite.load();
        }

        public render():void
        {
            this._shader.use();
            this._sprite.draw(this._shader, this._owner.worldMatrix);
            super.render();
        }
    }

    ComponentManager.registerBuilder(new SpriteComponentBuilder());
}