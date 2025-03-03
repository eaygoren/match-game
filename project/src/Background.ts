import * as PIXI from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./Configs";

export class Background extends PIXI.Container {
    private _app: PIXI.Application;

    private _background: PIXI.Sprite;
    
    constructor(app: any) {
        super();

        this._app = app;

        this.onLoad();
    }

    private onLoad() {
        this.create();
    }

    private create() {
        this._background = PIXI.Sprite.from("background");
        this._background.label = "Background";
        this._background.width = GAME_WIDTH;
        this._background.height = GAME_HEIGHT;
        this._background.anchor.set(0.5, 0.5);
        this._background.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2);
        this.addChild(this._background);
    }
}