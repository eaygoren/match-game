import * as mitt from "mitt";
import { EventNames } from "../EventBus";

// Define the Events type, mapping event names to their associated data
export type Events = {
    [EventNames.PlayerSucceeded]: void; // 'PlayerSucceeded' event
    [EventNames.PlayerFailed]: void; // 'PlayerFailed' event
};

// Declare the global variable 'eventBus' which is an instance of the mitt emitter
declare global {
    var eventBus: mitt.Emitter<Events>; // This allows us to use 'eventBus' globally in the project
}

export { };