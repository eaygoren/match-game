import * as mitt from "mitt";
import { EventNames } from "../EventBus";

// Event isimlerini içeren enum
export type Events = {
    [EventNames.PlayerSucceeded]: void; // 'PlayerSucceeded' eventi
    [EventNames.PlayerFailed]: void; // 'PlayerFailed' eventi
};

// mitt emitteri için global tanım
declare global {
    var eventBus: mitt.Emitter<Events>; // Tüm projede eventBus değişkeni tanımla
}

export { };