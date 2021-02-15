///<reference path="componentManager.ts"/>
///<reference path="baseComponent.ts"/>

namespace hyperEngine {
    export class TriangleComponentData implements IComponentData {
        public name: string;
        public size: Vector2 = Vector2.one;
        public origin: Vector3 = Vector3.zero;

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

        constructor(data: TriangleComponentData) {
            super(data);

            this._triangle = new Triangle(data.size.x, data.size.y);
            if (!data.origin.equals(Vector3.zero)) {
                this._triangle.origin.copyFrom(data.origin);
            }
        }

        public load(): void {
            this._triangle.load();
        }

        public render(shader: Shader): void {
            this._triangle.draw(shader, this._owner.worldMatrix);
            super.render(shader);
        }
    }

    ComponentManager.registerBuilder(new TriangleComponentBuilder());
}
