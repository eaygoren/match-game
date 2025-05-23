// Assetlerin yolları
export const ASSETS = [
    { alias: "background",      src: "assets/environment/background.png" },
    { alias: "hand",            src: "assets/environment/hand.png" },
    { alias: "line-orange",     src: "assets/environment/line-orange.png" },
    { alias: "logo",            src: "assets/environment/logo.png" },
    { alias: "shuffle",         src: "assets/environment/shuffle.png" },
];

// Kelimeler
export enum WORDS {
    GOLD = "GOLD",
    GOD = "GOD",
    DOG = "DOG",
    LOG = "LOG",
    OLD = "OLD",
    DO = "DO",
    GO = "GO",
}

// Harf pozisyonları
export const LETTER_POSITIONS = [
    { x: -75, y: 0 },
    { x: 0, y: -75 },
    { x: 75, y: 0 },
    { x: 0, y: 75 }
];

// Harf aralığı
export const WORD_GAP = 38;

// Kutu pozisyonları
export const BOX_POSITIONS = [
    {
        "GOLD": [
            { x: 125, y: 200 },
            { x: 205, y: 200 },
            { x: 285, y: 200 },
            { x: 365, y: 200 }
        ]
    },
    {
        "GOD": [
            { x: 125, y: 200 },
            { x: 125, y: 280 },
            { x: 125, y: 360 }
        ]
    },
    {
        "LOG": [
            { x: 285, y: 200 },
            { x: 285, y: 280 },
            { x: 285, y: 360 }
        ]
    },
    {
        "DOG": [
            { x: 125, y: 360 },
            { x: 205, y: 360 },
            { x: 285, y: 360 }
        ]
    },
    {
        "OLD": [
            { x: 365, y: 40 },
            { x: 365, y: 120 },
            { x: 365, y: 200 }
        ]
    },
    {
        "DO": [
            { x: 285, y: 40 },
            { x: 365, y: 40 }
        ]
    },
    {
        "GO": [
            { x: 45, y: 280 },
            { x: 125, y: 280 }
        ]
    }
];

// Oyun ölçüleri
export enum DIMENTIONS {
    landscape = "landscape",
    portrait = "portrait"
}

// Canvas genişliği ve yüksekliği
export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 800;

// Tutorial için geçecek zaman
export const IDLE_TIMER = 10000;