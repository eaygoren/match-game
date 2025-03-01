import * as PIXI from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, LETTER_POSITIONS, WORDS, BOX_POSITIONS, COORDINATES, ALIGNMENTS, BOX_GAP } from "./Configs";

export class Game extends PIXI.Container {
    private _app: PIXI.Application;

    private _letterArea: PIXI.Graphics;
    private _selectedLetters: string[] = [];
    private _wordGrid: Map<PIXI.Text, string> = new Map();
    private _validWords: Set<string>;
    private _letters: string[] = [];
    private _letterTexts: PIXI.Text[] = [];

    constructor(app: PIXI.Application) {
        super();

        this._app = app;
        this._validWords = new Set(Object.values(WORDS));

        this.onLoad();
    }

    private onLoad() {
        this.create();
        this.eventListeners();
    }

    private create() {
        this._letterArea = new PIXI.Graphics();
        this._letterArea.beginPath().circle(0, 0, 150).fill({ color: "white", alpha: 0.25 }).closePath();
        this._letterArea.label = "LetterArea";
        this._letterArea.position.set(GAME_WIDTH / 2, GAME_HEIGHT - (GAME_HEIGHT / 5));
        this.addChild(this._letterArea);

        // Enum'dan harfleri alıp, rastgele sırala
        this._letters = this.initializeLetters();

        // Harfleri yerleştirirken, en uzun kelimenin harf sayısına göre LETTER_POSITIONS array'ini kullanıyoruz
        this._letters.forEach((letter, index) => {
            const position = LETTER_POSITIONS[index];
            if (!position) {
                console.error(`No position found for letter ${letter} at index ${index}`);
                return; // Eğer pozisyon bulunamazsa, işlemi atla
            }

            const text = new PIXI.Text(letter, { fontSize: 75, fill: 0xffffff });
            text.label = `Letter-${letter}`;
            text.anchor.set(0.5, 0.5);
            text.position.set(position.x, position.y);
            this.addLetter(text, letter);
            this._letterArea.addChild(text);
        });
    }

    private eventListeners() {
        // Buraya event listener'ları ekleyebilirsiniz.
    }

    // Enum'dan harfleri alıp, rastgele sırala
    private initializeLetters(): string[] {
        const allLetters: string[] = [];
        Object.values(WORDS).forEach(word => {
            word.split('').forEach(letter => {
                if (!allLetters.includes(letter)) {
                    allLetters.push(letter); // Aynı harfleri tekrar eklemiyoruz
                }
            });
        });

        return this.shuffleArray(allLetters); // Harfleri karıştır
    }

    // Fisher-Yates algoritması ile diziyi karıştır
    private shuffleArray(array: string[]): string[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Rastgele index seç
            [array[i], array[j]] = [array[j], array[i]]; // Elementleri yer değiştir
        }
        return array;
    }

    // Harfleri grid üzerine ekle
    private addLetter(letter: PIXI.Text, char: string) {
        this._wordGrid.set(letter, char);
        letter.interactive = true;
        letter.on("pointerdown", () => this.startSelection(letter, char));
        letter.on("pointerover", () => this.continueSelection(letter, char));
        letter.on("pointerup", () => this.endSelection());
        this.addChild(letter);
        this._letterTexts.push(letter);
    }

    // Seçim başlat
    private startSelection(letter: PIXI.Text, char: string) {
        this._selectedLetters = [char];
        letter.style.fill = 0xffff00;
    }

    // Seçimi devam ettir
    private continueSelection(letter: PIXI.Text, char: string) {
        if (!this._selectedLetters.includes(char)) {
            this._selectedLetters.push(char);
            letter.style.fill = 0xffff00;
        }
    }

    private endSelection() {
        const word = this._selectedLetters.join("");
        if (this._validWords.has(word)) {
            this.wordFound(word);
        }
        this.resetSelection();
    }

    // Kelime bulunduğunda yapılacak işlem
    private wordFound(word: string) {
        console.log(`Found word: ${word}`);
        this.displayWordOnGrid(word); // Kelime ekrana yazdırılacak
    }

    // Kelimeyi grid üzerinde yazdır
    private displayWordOnGrid(word: string) {
        const positions = BOX_POSITIONS.find(p => p[word]); // Kelimenin pozisyonları
        if (!positions) return;

        const wordPositions = positions[word];
        let wordLetters = word.split(""); // Kelimenin harfleri

        wordPositions.forEach((word, index) => {
            const letter = wordLetters[index];
            const text = new PIXI.Text(letter, { fontSize: 75, fill: 0xffff00 });
            text.anchor.set(0.5, 0.5);

            switch (word.direction) {
                case COORDINATES.vertical:
                    console.log("Vertical");
                    switch (word.alignment) {
                        case ALIGNMENTS.down:
                            console.log("Down");
                            text.position.set((GAME_WIDTH / 2), (GAME_HEIGHT / 3) + (BOX_GAP * index));
                            break;
                        case ALIGNMENTS.up:
                            console.log("Up");
                            text.position.set((GAME_WIDTH / 2), (GAME_HEIGHT / 3) - (BOX_GAP * index));
                            break;
                    }
                    break;
                case COORDINATES.horizontal:
                    console.log("Horizontal");
                    text.position.set((GAME_WIDTH / 2) + (BOX_GAP * index), (GAME_HEIGHT / 3));
                    break;
            }
            this.addChild(text); // Harfleri grid üzerinde göster
        });
    }

    // Seçimi sıfırla
    private resetSelection() {
        this._selectedLetters = [];
        this._letterTexts.forEach(letter => letter.style.fill = 0xffffff);
    }
}