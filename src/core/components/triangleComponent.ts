import {IComponent} from "./interfaces/IComponent"
import {IComponentData} from "./interfaces/IComponentData"
import {IComponentBuilder} from "./interfaces/IComponentBuilder"
import {Vector2} from "../math/vector2"
import {Vector3} from "../math/vector3"
import {BaseComponent} from "./baseComponent"
import {Shader,BasicShader} from "../gl/shaders/shader"
import {ShaderManager} from "../gl/shaders/shaderManager"
import {Triangle} from "../graphics/primitives/triangle"

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

        this._shader = new BasicShader();
        if(data.shader !== undefined){
            this._shader = ShaderManager.getFromJson(data.shader);
        }
        this._triangle = new Triangle(data.size.x, data.size.y, this._shader.name);
        if (!data.origin.equals(Vector3.zero)) {
            this._triangle.origin.copyFrom(data.origin);
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
