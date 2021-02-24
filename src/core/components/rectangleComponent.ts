import {IComponent} from "./interfaces/IComponent"
import {IComponentData} from "./interfaces/IComponentData"
import {IComponentBuilder} from "./interfaces/IComponentBuilder"
import {Vector2} from "../math/vector2"
import {Vector3} from "../math/vector3"
import {Shader,BasicShader} from "../gl/shaders/shader"
import {BaseComponent} from "./baseComponent"
import {ShaderManager} from "../gl/shaders/shaderManager"
import {Rectangle} from "../graphics/primitives/rectangle"

export class RectangleComponentData implements IComponentData {
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
    private _shader: Shader;

    constructor(data: RectangleComponentData) {
        super(data);

        this._shader = new BasicShader();
        if (data.shader !== undefined) {
            this._shader = ShaderManager.getFromJson(data.shader);
        }
        this._rectangle = new Rectangle(data.size.x, data.size.y, this._shader.name);
        if (!data.origin.equals(Vector3.zero)) {
            this._rectangle.origin.copyFrom(data.origin);
        }
    }

    public load(): void {
        this._rectangle.load();
    }

    public render(): void {
        this._shader.use();
        this._rectangle.draw(this._shader, this._owner.worldMatrix);
        super.render();
    }
}
