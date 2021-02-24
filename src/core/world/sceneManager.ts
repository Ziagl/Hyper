import { Scene } from './scene';
import { IMessageHandler } from '../message/interfaces/IMessageHandler';
import { Message } from '../message/message';
import {
    AssetManager,
    MESSAGE_ASSET_LOADER_ASSET_LOADED,
} from '../assets/assetManager';
import { JsonAsset } from '../assets/jsonAssetLoader';
import { ComponentManager } from '../components/componentManager';
import { RectangleComponentBuilder } from '../components/rectangleComponent';
import { SpriteComponentBuilder } from '../components/spriteComponent';
import { BitmapTextComponentBuilder } from '../components/bitmapTextComponent';
import { TriangleComponentBuilder } from '../components/triangleComponent';

export class SceneManager implements IMessageHandler {
    private static _globalSceneID: number = -1;
    //private static _zones:{[id:number]:Zone} = {};
    private static _registeredScenes: { [id: number]: string } = {};
    private static _activeScene: Scene;
    private static _inst: SceneManager;

    private constructor() {}

    public static initialize(): void {
        SceneManager._inst = new SceneManager();

        // initialize all possible components
        ComponentManager.registerBuilder(new RectangleComponentBuilder());
        ComponentManager.registerBuilder(new TriangleComponentBuilder());
        ComponentManager.registerBuilder(new SpriteComponentBuilder());
        ComponentManager.registerBuilder(new BitmapTextComponentBuilder());

        //TODO only temporary
        SceneManager._registeredScenes[0] = 'assets/scenes/sampleScene.json';
    }

    public static changeScene(id: number): void {
        if (SceneManager._activeScene !== undefined) {
            SceneManager._activeScene.onDeactivated();
            SceneManager._activeScene.unload();
            SceneManager._activeScene = undefined;
        }

        if (SceneManager._registeredScenes[id] !== undefined) {
            if (
                AssetManager.isAssetLoaded(SceneManager._registeredScenes[id])
            ) {
                let asset = AssetManager.getAsset(
                    SceneManager._registeredScenes[id]
                );
                SceneManager.loadScene(asset);
            } else {
                Message.subscribe(
                    MESSAGE_ASSET_LOADER_ASSET_LOADED +
                        SceneManager._registeredScenes[id],
                    SceneManager._inst
                );
                AssetManager.loadAsset(SceneManager._registeredScenes[id]);
            }
        } else {
            throw new Error('Scene id: ' + id.toString() + ' does not exist.');
        }
    }

    public static update(time: number): void {
        if (SceneManager._activeScene !== undefined) {
            SceneManager._activeScene.update(time);
        }
    }

    public static render(): void {
        if (SceneManager._activeScene !== undefined) {
            SceneManager._activeScene.render();
        }
    }

    public onMessage(message: Message): void {
        if (message.code.indexOf(MESSAGE_ASSET_LOADER_ASSET_LOADED) !== -1) {
            console.log('Scene loaded: ' + message.code);
            let asset = message.context as JsonAsset;
            SceneManager.loadScene(asset);
        }
    }

    private static loadScene(asset: JsonAsset): void {
        console.log('Loading scene: ' + asset.name);
        let sceneData = asset.data;
        let sceneId: number;
        if (sceneData.id === undefined) {
            throw new Error(
                'Scene file format exception: Scene id not present.'
            );
        } else {
            sceneId = Number(sceneData.id);
        }

        let sceneName: string;
        if (sceneData.name === undefined) {
            throw new Error(
                'Scene file format exception: Scene name not present.'
            );
        } else {
            sceneName = String(sceneData.name);
        }

        let sceneDescription: string;
        if (sceneData.description !== undefined) {
            sceneDescription = String(sceneData.description);
        }

        SceneManager._activeScene = new Scene(
            sceneId,
            sceneName,
            sceneDescription
        );
        SceneManager._activeScene.initialize(sceneData);
        SceneManager._activeScene.onActivated();
        SceneManager._activeScene.load();
    }
}
