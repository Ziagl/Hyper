///<reference path="componentManager.ts"/>
///<reference path="baseComponent.ts"/>

namespace hyperEngine {
    export class TriangleComponentData implements IComponentData {
        public name: string;
        public size: Vector2 = Vector2.one;
        public origin: Vector3 = Vector3.zero;
        public shader: string;

        public setFromJson(json: any): void {
            if (json.name !== undefined) {
                this.name = String(json.name);
            }
            if (json.size !== undefined) {
                this.size.setFromJson(json.size);
            }
            if (json.origin !== undefined) {
                this.origin.setFromJson(json.origin);
            }
            if (json.shader !== undefined) {
                this.shader = String(json.shader);
            }
        }
    }

    export class TriangleComponentBuilder implements IComponentBuilder {
        public get type(): string {
            return 'triangle';
        }

        public buildFromJson(json: any): IComponent {
            let data = new TriangleComponentData();
            data.setFromJson(json);
            return new TriangleComponent(data);
        }
    }

    export class TriangleComponent extends BaseComponent {
        private _triangle: Triangle;
        private _shader: Shader;

        constructor(data: TriangleComponentData) {
            super(data);

            this._triangle = new Triangle(data.size.x, data.size.y);
            if (!data.origin.equals(Vector3.zero)) {
                this._triangle.origin.copyFrom(data.origin);
            }
            this._shader = new BasicShader();
            if(data.shader !== undefined){
                this._shader = ShaderManager.getFromJson(data.shader);
            }
        }

        public load(): void {
            this._triangle.load();
        }

        public render(): void {
            this._shader.use();
            this._triangle.draw(this._shader, this._owner.worldMatrix);
            super.render();
        }
    }

    ComponentManager.registerBuilder(new TriangleComponentBuilder());
}
