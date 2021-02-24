import { Entity } from './entity';
import { ComponentManager } from '../components/componentManager';

export class Scene {
    private _id: number;
    private _name: string;
    private _description: string;
    private _root: Entity;
    private _globalID: number = -1;

    constructor(id: number, name: string, description: string) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._root = new Entity(0, '__ROOT__', this);
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }

    public get root(): Entity {
        return this._root;
    }

    public get isLoaded(): boolean {
        return this._root.isLoaded;
    }

    /**
     * initialize scene by given scene data
     * @param sceneData to use for this scene
     */
    public initialize(sceneData: any): void {
        for (let o in sceneData.objects) {
            let obj = sceneData.objects[o];

            this.loadEntity(obj, this._root);
        }
    }

    /**
     * add object to scene
     * @param object object to add
     */
    public addObject(object: Entity): void {
        this._root.addChild(object);
    }

    /**
     * get an object from screen by name
     * @param name name of object to search for
     */
    public getObjectByName(name: string): Entity {
        return this._root.getObjectByName(name);
    }

    /**
     * recursively load scene graph
     */
    public load(): void {
        this._root.load();
    }

    /**
     * unloads this scene graph
     */
    public unload(): void {
        this._root = undefined;
    }

    /**
     * recursively update all objects in scene graph
     * @param time delta time
     */
    public update(time: number): void {
        this._root.update(time);
    }

    /**
     * recursively render all objects in screne graph
     */
    public render(): void {
        this._root.render();
    }

    public onActivated(): void {}

    public onDeactivated(): void {}

    /**
     * recursive function to load scene from given data section
     * @param dataSection data to load scene subtree from
     * @param parent parent element, caller for this function
     */
    private loadEntity(dataSection: any, parent: Entity): void {
        let name: string;
        if (dataSection.name !== undefined) {
            name = String(dataSection.name);
        }

        this._globalID++;
        let entity = new Entity(this._globalID, name, this);

        if (dataSection.transform !== undefined) {
            entity.transform.setFromJson(dataSection.transform);
        }

        if (dataSection.components !== undefined) {
            for (let c in dataSection.components) {
                let data = dataSection.components[c];
                let component = ComponentManager.extractComponent(data);
                entity.addComponent(component);
            }
        }

        // TODO!
        /*if (dataSection.behaviors !== undefined) {
            for (let b in dataSection.behaviors) {
                let data = dataSection.behaviors[b];
                let behavior = BehaviorManager.extractBehavior(data);
                entity.addBehavior(behavior);
            }
        }*/

        if (dataSection.children !== undefined) {
            for (let o in dataSection.children) {
                let obj = dataSection.children[o];
                this.loadEntity(obj, entity);
            }
        }

        if (parent !== undefined) {
            parent.addChild(entity);
        }
    }
}
