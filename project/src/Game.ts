import * as PIXI from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, LETTER_POSITIONS, WORDS, BOX_POSITIONS, WORD_GAP, IDLE_TIMER } from "./Configs";
import gsap from "gsap";

export class Game extends PIXI.Container {
    private _app: PIXI.Application;

    private _emptyBoxContainer: PIXI.Container;
    private _loadedBoxContainer: PIXI.Container;
    private _letterContainer: PIXI.Container;
    private _circleContainer: PIXI.Container;
    private _lineContainer: PIXI.Container;
    private _letterButtonContainer: PIXI.Container;

    private _letterArea: PIXI.Graphics;
    private _shuffleButton: PIXI.Sprite;
    private _infoArea: PIXI.Graphics;
    private _infoText: PIXI.Text;
    private _selectedLetters: string[] = [];
    private _foundedWords: string[] = [];
    private _wordGrid: Map<PIXI.Text, string> = new Map();
    private _letterMap: Map<string, PIXI.Text> = new Map();
    private _boxMap: Set<string> = new Set();
    private _validWords: Set<string>;
    private _letters: string[] = [];
    private _letterTexts: PIXI.Text[] = [];
    private _lastLetter: PIXI.Text | null = null;
    private _isDragging: boolean = false;
    private _tutorialTimeout: any;
    private _tutorialHand: PIXI.Sprite;

    constructor(app: PIXI.Application) {
        super();

        this._app = app;
        this._validWords = new Set(Object.values(WORDS));

        this.onLoad();
    }

    private onLoad() {
        this.create();
        this.eventListeners();
        this.startIdleTimer();
    }

    // Oyun alanını oluştur
    private create() {
        // Harflerin bulunduğu alan
        this._letterArea = new PIXI.Graphics();
        this._letterArea.beginPath().circle(0, 0, 125).fill({ color: "white", alpha: 0.8 }).closePath();
        this._letterArea.label = "LetterArea";
        this._letterArea.position.set(GAME_WIDTH / 2, GAME_HEIGHT - (GAME_HEIGHT / 5));
        this.addChild(this._letterArea);

        // Harfleri karıştırma butonu
        this._shuffleButton = PIXI.Sprite.from("shuffle");
        this._shuffleButton.label = "ShuffleButton";
        this._shuffleButton.anchor.set(0.5, 0.5);
        this._shuffleButton.scale.set(0.1, 0.1);
        this._shuffleButton.eventMode = "static";
        this._shuffleButton.cursor = "pointer";
        this._letterArea.addChild(this._shuffleButton);

        // Harfler arasında çizilecek çizgiler için container
        this._lineContainer = new PIXI.Container();
        this._lineContainer.label = "LineContainer";
        this._letterArea.addChild(this._lineContainer);

        // Harflerin seçildiğini gösteren daireler için container
        this._circleContainer = new PIXI.Container();
        this._circleContainer.label = "CircleContainer";
        this._letterArea.addChild(this._circleContainer);

        this._letterButtonContainer = new PIXI.Container();
        this._letterButtonContainer.label = "LetterButtonContainer";
        this._letterArea.addChild(this._letterButtonContainer);

        // Tutorial için el simgesi
        this._tutorialHand = PIXI.Sprite.from("hand");
        this._tutorialHand.label = "Hand";
        this._tutorialHand.scale.set(0.5, 0.5);
        this._tutorialHand.alpha = 0;
        this._tutorialHand.visible = false;
        this._letterArea.addChild(this._tutorialHand);

        // Bilgi alanı
        this._infoArea = new PIXI.Graphics();
        this._infoArea.beginPath().roundRect(GAME_WIDTH / 8, GAME_HEIGHT - (GAME_HEIGHT / 2.3), 360, 50, 10).fill({ color: "orange", alpha: 0.8 }).closePath();
        this._infoArea.label = "InfoArea";
        this._infoArea.alpha = 0;
        this._infoArea.visible = false;
        this.addChild(this._infoArea);

        // Bilgi metni
        this._infoText = new PIXI.Text({ text: "", style: { fontFamily: "Sniglet", fontSize: 30, fill: 0xffffff } });
        this._infoText.label = "InfoText";
        this._infoText.anchor.set(0.5, 0.5);
        this._infoText.position.set(240, 475);
        this._infoArea.addChild(this._infoText);

        // Boş kutuların bulunduğu alanlar
        this._emptyBoxContainer = new PIXI.Container();
        this._emptyBoxContainer.label = "EmptyBoxContainer";
        this.addChild(this._emptyBoxContainer);

        // Harf kutularının bulunduğu alanlar
        this._loadedBoxContainer = new PIXI.Container();
        this._loadedBoxContainer.label = "LoadedBoxContainer";
        this.addChild(this._loadedBoxContainer);

        // Harflerin bulunduğu alan
        this._letterContainer = new PIXI.Container();
        this._letterContainer.label = "LetterContainer";
        this.addChild(this._letterContainer);

        this.initializeLetters();
        this.createWordGridArea();
    }

    // Event listenerlar
    private eventListeners() {
        this._shuffleButton.on("pointerdown", () => {
            this.reShuffleLetters();
        });

        window.onpointerdown = () => {
            this.resetIdleTimer();
        };

        // window üzerindeki tıklamaları dinle, canvas dışında onpointerup yapıldığında onpointerup eventi çalışmıyor
        // o yüzden window üzerinde dinleme yapılıyor
        window.onpointerup = () => {
            this.endSelection();
        };
    }

    // Enum'dan harfleri alıp rastgele sırala
    private initializeLetters(): void {
        const allLetters: string[] = [];
        Object.values(WORDS).forEach(word => {
            word.split('').forEach(letter => {
                if (!allLetters.includes(letter)) {
                    allLetters.push(letter);
                }
            });
        });

        this._letters = this.shuffleArray(allLetters);

        this._letters.forEach((letter, index) => {
            const position = LETTER_POSITIONS[index];
            if (!position) return;

            const text = new PIXI.Text({ text: letter, style: { fontFamily: "Sniglet", fontSize: 75, fill: "#FFA500" } });
            text.label = `Letter-${letter}`;
            text.anchor.set(0.5, 0.5);
            text.position.set(position.x, position.y);
            this.addLetter(text, letter);
            this._letterButtonContainer.addChild(text);
        });
    }

    // Harfleri yeniden karıştır
    private reShuffleLetters(): void {
        let letterPositions = this.shuffleArray(LETTER_POSITIONS);
        this._letters.forEach((letter, index) => {
            const text = this._letterTexts.find(t => t.text === letter);
            gsap.to(text, { x: letterPositions[index].x, y: letterPositions[index].y, duration: 0.25, ease: "none" });
        });
    }

    // Fisher-Yates algoritması ile diziyi karıştır
    // Referans: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    private shuffleArray(array: any[]): any[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Harfleri grid üzerine ekle
    private addLetter(letter: PIXI.Text, char: string) {
        this._wordGrid.set(letter, char);
        letter.interactive = true;
        letter.cursor = "pointer";
        letter.on("pointerdown", () => this.startSelection(letter, char));
        letter.on("pointerover", () => this.continueSelection(letter, char));
        this.addChild(letter);
        this._letterTexts.push(letter);
    }

    // Seçimi başlat
    private startSelection(letter: PIXI.Text, char: string) {
        this.createCircle(letter, char);

        this._isDragging = true;
        this._selectedLetters = [char];
        letter.style.fill = "#ffffff";

        this._infoArea.visible = true;

        gsap.killTweensOf(this._infoArea);
        gsap.killTweensOf(this._infoText.position);
        this._infoArea.alpha = 0;
        this._infoText.position.set(240, 475);
        gsap.to(this._infoArea, {
            alpha: 1, duration: 0.50, ease: "none", onStart: () => {
                this._infoText.text = char;
                this._infoArea.visible = true
            }
        });

        this._lastLetter = letter; // ilk harfi ekle
    }

    // Seçimi devam ettir
    private continueSelection(letter: PIXI.Text, char: string) {
        if (!this._selectedLetters.includes(char) && this._isDragging) {
            this.createCircle(letter, char);

            this._selectedLetters.push(char);
            letter.style.fill = "#ffffff";

            if (this._lastLetter) {
                this.createLine(this._lastLetter, letter);
            }

            this._infoText.text = this._infoText.text + ` ${char}`;

            this._lastLetter = letter; // son harfi güncelle
        }
    }

    // Seçimi sonlandır
    private endSelection() {
        const word = this._selectedLetters.join("");

        if (this._validWords.has(word)) {
            this.wordFound(word);
        } else {
            this._infoText.text = `Invalid word: ${word}`;
            gsap.to(this._infoText.position, { x: this._infoText.position.x + 5, duration: 0.05, yoyo: true, repeat: 10, ease: "none" });
        }

        gsap.to(this._infoArea, {
            alpha: 0, duration: 0.50, delay: 2, ease: "none", onComplete: () => {
                this._infoArea.visible = false;
            }
        });

        this.resetSelection();
    }

    // Seçimleri sıfırla
    private resetSelection() {
        this._circleContainer.removeChildren();

        this._isDragging = false;
        this._lastLetter = null;
        this._selectedLetters = [];
        this._letterTexts.forEach((letter) => letter.style.fill = "#FFA500");
        this._lineContainer.removeChildren();
    }

    // şeçilen harfler içim kutu oluştur
    private createCircle(letter: PIXI.Text, char: string) {
        let selectBox = new PIXI.Graphics();
        selectBox.beginPath().roundRect(-35, -35, 70, 70, 10).fill({ color: "orange", alpha: 1 }).closePath();
        selectBox.label = `LoadedBox-${char}`;
        selectBox.position.set(letter.x, letter.y);
        this._circleContainer.addChild(selectBox);
    }

    // Harfler arasında çizgi oluştur
    private createLine(from: PIXI.Text, to: PIXI.Text) {
        let line = new PIXI.Graphics();
        line.moveTo(from.x, from.y);
        line.lineTo(to.x, to.y);
        line.stroke({ color: "orange", width: 10 });

        this._lineContainer.addChild(line);
    }

    // Kelime bulunduğunda
    private wordFound(word: string) {
        // kelimenin kutu pozisyonlarını al
        const positions = BOX_POSITIONS.find((p) => p[word]);
        if (!positions) return;

        const wordPositions = positions[word];

        if (this._foundedWords.includes(word)) {
            this._infoText.text = `Already founded: ${word}`;
            gsap.to(this._infoText.position, { x: this._infoText.position.x + 5, duration: 0.05, yoyo: true, repeat: 10, ease: "none" });
            return;
        } else {
            this._foundedWords.push(word);

            // harflerin bulunduğu pozisyonları kullanarak kutuları aç
            wordPositions.forEach(position => {
                this._loadedBoxContainer.children.forEach(child => {
                    if (child.x === position.x && child.y === position.y) {
                        child.visible = true;
                    }
                });
            });
        }

        this.displayWordOnGrid(word);
    }

    // Kelimeyi ekrana yazdır
    private displayWordOnGrid(word: string) {
        const positions = BOX_POSITIONS.find((p) => p[word]);
        if (!positions) return;

        const wordPositions = positions[word];
        let wordLetters = word.split(""); // Kelimenin harfleri

        wordPositions.forEach((position, index) => {
            const letter = wordLetters[index];
            const key = `${letter}-${position.x}-${position.y}`; // Harfin konumunu belirle

            gsap.killTweensOf(this._infoText.position);

            // Eğer harf daha önce eklenmişse tekrar ekleme
            if (this._letterMap.has(key)) {
                return;
            }

            this._infoText.text = `Founded word: ${word}`;

            const text = new PIXI.Text({ text: letter, style: { fontFamily: "Sniglet", fontSize: 50, fill: 0xFFFFFF } });
            text.label = `Word-${letter}`;
            text.anchor.set(0.5, 0.5);
            text.scale.set(0, 0);
            text.position.set(position.x + WORD_GAP, position.y + WORD_GAP);

            this._letterMap.set(key, text); // Harfi kayıt altına al
            this._letterContainer.addChild(text); // Harfleri grid üzerinde göster
            gsap.to(text.scale, { x: 1, y: 1, duration: 0.25, ease: "back.out(2)", delay: index * 0.25 });
        });
    }

    // Kelimeler için kutular oluştur
    private createWordGridArea() {
        BOX_POSITIONS.forEach(wordObject => {
            const word = Object.keys(wordObject)[0]; // Kelimeyi al
            const wordPositions = wordObject[word]; // O kelimenin tüm pozisyonları

            wordPositions.forEach(position => {
                const key = `${position.x}-${position.y}`; // Kutunun konumunu belirle

                // Eğer bu konumda zaten bir kutu varsa tekrar ekleme
                if (this._boxMap.has(key)) {
                    return;
                }

                // Boş kutuları oluştur sprite veya graphics kullanarak
                //const emptyBox = PIXI.Sprite.from("rect-white");
                //emptyBox.anchor.set(0.5,0.5);
                //emptyBox.scale.set(0.3, 0.3);
                const emptyBox = new PIXI.Graphics();
                emptyBox.beginPath().roundRect(0, 0, 75, 75, 10).fill({ color: "white", alpha: 0.8 }).closePath();
                emptyBox.label = `EmptyBox-${word}`;
                emptyBox.position.set(position.x, position.y);
                this._emptyBoxContainer.addChild(emptyBox);

                // Harf kutusunu oluştur sprite/graphics kullanarak
                //const loadedBox = PIXI.Sprite.from("rect-orange");
                //loadedBox.anchor.set(0.5, 0.5);
                //loadedBox.scale.set(0.13, 0.13);
                const loadedBox = new PIXI.Graphics();
                loadedBox.beginPath().roundRect(0, 0, 75, 75, 10).fill({ color: "orange", alpha: 0.8 }).closePath();
                loadedBox.label = `LoadedBox-${word}`;
                loadedBox.position.set(position.x, position.y);
                loadedBox.visible = false;
                this._loadedBoxContainer.addChild(loadedBox);

                // Eklenen kutunun pozisyonunu mape ekle
                this._boxMap.add(key);
            });
        });
    }

    // Zamanlayıcıyı başlat, default 10 saniye sonra tutorial başlar
    private startIdleTimer() {
        this._tutorialTimeout = setTimeout(() => {
            this.startTutorial();
        }, IDLE_TIMER);
    }

    // Zamanlayıcıyı sıfırla
    private resetIdleTimer() {
        clearTimeout(this._tutorialTimeout);
        this.endTutorial();
        this.startIdleTimer();
    }

    // Tutorial başlatma
    private startTutorial() {
        // Rastgele bir kelime seç
        let word = Object.values(WORDS)[Math.floor(Math.random() * Object.values(WORDS).length)];
        let targetPositions: PIXI.Point[] = [];
        let index: number = 0;

        // Seçilen kelimenin harflerinin pozisyonlarını al
        word.split('').forEach(letter => {
            for (let childIndex = 0; childIndex < this._letterArea.getChildByName("LetterButtonContainer").children.length; childIndex++) {
                if (this._letterArea.getChildByName("LetterButtonContainer").children[childIndex].label === `Letter-${letter}`) {
                    targetPositions[index] = this._letterArea.getChildByName("LetterButtonContainer").children[childIndex].position;
                    index++;
                    break;
                }
            }
        });

        // tutorial elinin başlangıç pozisyonu
        this._tutorialHand.position.set(targetPositions[0].x, targetPositions[0].y);

        // tutorial elini hareket ettir
        gsap.to(this._tutorialHand, {
            alpha: 1, duration: 0.25, ease: "none", onStart: () => {
                this._tutorialHand.visible = true
            }, onComplete: () => {
                for (let gIndex = 0; gIndex < targetPositions.length; gIndex++) {
                    gsap.to(this._tutorialHand, {
                        x: targetPositions[gIndex].x, y: targetPositions[gIndex].y, duration: 0.75, ease: "none", delay: gIndex * 1,
                        onComplete: () => {
                            if (gIndex === targetPositions.length - 1) {
                                gsap.to(this._tutorialHand, {
                                    alpha: 0, duration: 0.5, ease: "none", delay: 0.5, onComplete: () => {
                                        // Tutorial bitince 2 saniye sonra tekrar başlat
                                        setTimeout(() => {
                                            this.endTutorial();
                                            this.startTutorial();
                                        }, 2000);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }

    // Tutorial bitirme
    private endTutorial() {
        gsap.killTweensOf(this._tutorialHand);
        gsap.killTweensOf(this._tutorialHand.position);
        this._tutorialHand.visible = false;
        this._tutorialHand.alpha = 0;
    }
}