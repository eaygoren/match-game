import mitt from "mitt";
import { Events } from "./def/global";

/**
 * Tüm event isimlerini içeren enum
 */
export enum EventNames {
    // Oyuncunun başarılı olduğu durumlar
    PlayerSucceeded = "playerSucceeded",
    
    // Oyuncunun başarısız olduğu durumlar
    PlayerFailed = "playerFailed",
}

/**
 * Tüm sınıfların erişebilmesi içim lobal event tanımı
 */
export const eventBus = mitt<Events>();