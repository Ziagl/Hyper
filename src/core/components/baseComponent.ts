namespace hyperEngine {
    export abstract class BaseComponent implements IComponent {
        protected _owner: Entity;
        protected _data: IComponentData;
        public name: string;

        constructor(data: IComponentData) {
            this._data = data;
            this.name = data.name;
        }

        public get owner(): Entity {
            return this._owner;
        }

        public setOwner(owner: Entity): void {
            this._owner = owner;
        }

        public load(): void {}

        public update(time: number): void {}

        public render(shader: Shader): void {}
    }
}
