import { core } from "./core";

/**
 * Oyunun başlangıç noktası
 */
(async () => {
    /**
     * core class'ını başlat ve mainScene değişkenine ata
     */
    const mainScene = await new core().init();
})();