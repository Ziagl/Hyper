///<reference path="componentManager.ts"/>
///<reference path="baseComponent.ts"/>

namespace hyperEngine {
    export class RectangleComponentData implements IComponentData {
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

    export class RectangleComponentBuilder implements IComponentBuilder {
        public get type(): string {
            return 'rectangle';
        }

        public buildFromJson(json: any): IComponent {
            let data = new RectangleComponentData();
            data.setFromJson(json);
            return new RectangleComponent(data);
        }
    }

    export class RectangleComponent extends BaseComponent {
        private _rectangle: Rectangle;

        constructor(data: RectangleComponentData) {
            super(data);

            this._rectangle = new Rectangle(data.size.x, data.size.y);
            if (!data.origin.equals(Vector3.zero)) {
                this._rectangle.origin.copyFrom(data.origin);
            }
        }

        public load(): void {
            this._rectangle.load();
        }

        public render(shader: Shader): void {
            this._rectangle.draw(shader, this._owner.worldMatrix);
            super.render(shader);
        }
    }

    ComponentManager.registerBuilder(new RectangleComponentBuilder());
}
