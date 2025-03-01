import mitt from "mitt";
import { Events } from "./def/global";

/**
 * Enum defining all event names used in the event bus.
 */
export enum EventNames {
    /** Triggered when the player succeeded. */
    PlayerSucceeded = "playerSucceeded",
    
    /** Triggered when the player failed. */
    PlayerFailed = "playerFailed",
}

/**
 * Global event bus for managing game-wide events.
 */
export const eventBus = mitt<Events>();