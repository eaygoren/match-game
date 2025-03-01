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

export enum COORDINATES {
    horizontal = "horizontal",
    vertical = "vertical"
}

export enum ALIGNMENTS {
    left = "left",
    up = "up",
    down = "down"
};

export const BOX_GAP = 50;

export const BOX_POSITIONS = [
    {
        "GOLD": [
            { direction: COORDINATES.horizontal, alignment: ALIGNMENTS.left },
            { direction: COORDINATES.horizontal, alignment: ALIGNMENTS.left },
            { direction: COORDINATES.horizontal, alignment: ALIGNMENTS.left },
            { direction: COORDINATES.horizontal, alignment: ALIGNMENTS.left },
        ]
    },
    {
        "GOD": [
            { direction: COORDINATES.vertical, alignment: ALIGNMENTS.down },
            { direction: COORDINATES.vertical, alignment: ALIGNMENTS.down },
            { direction: COORDINATES.vertical, alignment: ALIGNMENTS.down },
        ]
    },
    {
        "LOG": [
            { direction: COORDINATES.vertical, alignment: ALIGNMENTS.down },
            { direction: COORDINATES.vertical, alignment: ALIGNMENTS.down },
            { direction: COORDINATES.vertical, alignment: ALIGNMENTS.down },
        ]
    },
    {
        "DOG": [
            { direction: COORDINATES.horizontal, alignment: ALIGNMENTS.left },
            { direction: COORDINATES.horizontal, alignment: ALIGNMENTS.left },
            { direction: COORDINATES.horizontal, alignment: ALIGNMENTS.left },
        ]
    },
    {
        "OLD": [
            { direction: COORDINATES.vertical, alignment: ALIGNMENTS.up },
            { direction: COORDINATES.vertical, alignment: ALIGNMENTS.up },
            { direction: COORDINATES.vertical, alignment: ALIGNMENTS.up },
        ]
    },
    {
        "DO": [
            { direction: COORDINATES.vertical, alignment: ALIGNMENTS.up },
            { direction: COORDINATES.vertical, alignment: ALIGNMENTS.up },
        ]
    },
    {
        "GO": [
            { direction: COORDINATES.vertical, alignment: ALIGNMENTS.up },
            { direction: COORDINATES.vertical, alignment: ALIGNMENTS.up },
        ]
    }
];

export enum DIMENTIONS {
    landscape = "landscape",
    portrait = "portrait"
}

export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 800;