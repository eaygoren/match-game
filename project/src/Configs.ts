// Define asset references with aliases and sources for images
export const ASSETS = [
    { alias: "background",      src: "assets/environment/background.png" },
    { alias: "bubble-orange",   src: "assets/environment/bubble-orange.png" },
    { alias: "bubble-white",    src: "assets/environment/bubble-white.png" },
    { alias: "cross",           src: "assets/environment/cross.png" },
    { alias: "hand",            src: "assets/environment/hand.png" },
    { alias: "logo",            src: "assets/environment/logo.png" },
    { alias: "panel-gray",      src: "assets/environment/panel-gray.png" },
    { alias: "panel-green",     src: "assets/environment/panel-green.png" },
    { alias: "panel-orange",    src: "assets/environment/panel-orange.png" },
    { alias: "rect-orange",     src: "assets/environment/rect-orange.png" },
    { alias: "rect-white",      src: "assets/environment/rect-white.png" },
    { alias: "suffle",          src: "assets/environment/suffle.png" },
    { alias: "tick",            src: "assets/environment/tick.png" }
];

export enum WORDS {
    GOLD = "GOLD",
    GOD = "GOD",
    DOG = "DOG",
    LOG = "LOG",
    OLD = "OLD",
    DO = "DO",
}

export const LETTER_POSITIONS = [
    { x: -75, y: 0 },
    { x: 0, y: -75 },
    { x: 75, y: 0 },
    { x: 0, y: 75 }
];

export const BOX_POSITIONS = [
    {
        "GOLD": [
            { x: 80, y: 200 },
            { x: 150, y: 150 },
            { x: 300, y: 150 },
            { x: 450, y: 150 }
        ]
    },
    {
        "GOD": [
            { x: 0, y: 150 },
            { x: 0, y: 300 },
            { x: 0, y: 450 }
        ]
    },
    {
        "LOG": [
            { x: 300, y: 150 },
            { x: 300, y: 300 },
            { x: 300, y: 450 }
        ]
    },
    {
        "DOG": [
            { x: 0, y: 450 },
            { x: 150, y: 450 },
            { x: 300, y: 450 }
        ]
    },
    {
        "OLD": [
            { x: 150, y: 150 },
            { x: 150, y: 0 },
            { x: 150, y: -150 }
        ]
    },
    {
        "DO": [
            { x: 450, y: 150 },
            { x: 450, y: 0 }
        ]
    }
];

export enum DIMENTIONS {
    landscape = "landscape",
    portrait = "portrait"
}

export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 800;