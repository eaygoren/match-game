import * as PIXI from "pixi.js";
import { eventBus } from "./EventBus";
import { ASSETS, GAME_HEIGHT, GAME_WIDTH } from "./Configs";
import { Background } from "./Background";
import { Game } from "./Game";

globalThis.eventBus = eventBus;

export class core extends PIXI.Container {
    private _app: PIXI.Application;

    /**
     * Initializes the core class and creates a new PIXI application.
     */
    constructor() {
        super();

        this._app = new PIXI.Application();

        this._app.stage.addChild(this);

        (globalThis as any).__PIXI_APP__ = this._app;
    }

    /**
     * Asynchronous initialization of the core system, loading assets and setting up components.
     */
    async init() {
        await this._app.init({
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            backgroundColor: 0x1e1e37,
        });

        document.getElementById("Container")?.appendChild(this._app.canvas);

        await PIXI.Assets.load(ASSETS);
        await document.fonts.ready;

        const background = new Background(this._app);
        this.addChild(background);

        const game = new Game(this._app);
        this.addChild(game);

        window.addEventListener("resize", this.onResize.bind(this));

        this.onResize();
    }

    /**
     * Handles window resize events and adjusts the canvas size accordingly.
     */
    onResize(): void {
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        const scale = Math.min(screenWidth / GAME_WIDTH, screenHeight / GAME_HEIGHT);

        const enlargedWidth = Math.floor(scale * GAME_WIDTH);
        const enlargedHeight = Math.floor(scale * GAME_HEIGHT);

        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        this._app.canvas.style.width = `${enlargedWidth}px`;
        this._app.canvas.style.height = `${enlargedHeight}px`;
        this._app.canvas.style.marginLeft = this._app.canvas.style.marginRight = `${horizontalMargin}px`;
        this._app.canvas.style.marginTop = this._app.canvas.style.marginBottom = `${verticalMargin}px`;
    }
}