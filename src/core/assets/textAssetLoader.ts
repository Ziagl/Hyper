import {IAssetLoader} from "./interfaces/IAssetLoader"
import {IAsset} from "./interfaces/IAsset"
import {AssetManager} from "./assetManager"

export class TextAsset implements IAsset {
    public readonly name: string;
    public readonly data: string;
    constructor(name: string, data: string) {
        this.name = name;
        this.data = data;
    }
}

export class TextAssetLoader implements IAssetLoader {
    public get supportedExtensions(): string[] {
        return ['fnt'];
    }

    public loadAsset(assetName: string): void {
        let request = new XMLHttpRequest();
        request.open('get', assetName);
        request.addEventListener(
            'load',
            this.onTextLoaded.bind(this, assetName, request)
        );
        request.send();
    }

    private onTextLoaded(assetName: string, request: XMLHttpRequest): void {
        console.debug(
            'onTextLoaded: assetName/request',
            assetName,
            request
        );
        if (request.readyState === request.DONE) {
            let asset = new TextAsset(assetName, request.responseText);
            AssetManager.onAssetLoaded(asset);
        }
    }
}
