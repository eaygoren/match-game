import * as PIXI from "pixi.js";
import { DIMENTIONS, GAME_HEIGHT, GAME_WIDTH } from "./Configs";

export class Background extends PIXI.Container {
    private _app: PIXI.Application;

    private _background: PIXI.Sprite;

    /**
     * Creates a background class instance.
     * @param app - PixiJS application instance.
     */
    constructor(app: any) {
        super();

        this._app = app;

        this.onLoad();
    }

    /**
     * Initializes the background loading process.
     */
    private onLoad() {
        this.create();
        this.eventListeners();
    }

    /**
     * Creates the background sprite and adds it to the scene.
     */
    private create() {
        this._background = PIXI.Sprite.from("background");
        this._background.label = "Background";
        this._background.width = GAME_WIDTH;
        this._background.height = GAME_HEIGHT;
        this._background.anchor.set(0.5, 0.5);
        this._background.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2);
        this.addChild(this._background);

        this.onResize();
    }

    /**
     * Defines event listeners for the background.
     */
    private eventListeners() {
        window.addEventListener("resize", this.onResize.bind(this));
    }

    onResize(): void {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const orientation = screenWidth > screenHeight ? DIMENTIONS.landscape : DIMENTIONS.portrait;

        switch (orientation) {
            case DIMENTIONS.landscape:
                break;
            case DIMENTIONS.portrait:
                break;
        }
    }
}