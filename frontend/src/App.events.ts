import { Page } from "./state/state";

declare global {
  interface EventIndex {
    /** Keys are the names of the events, and values are payloads. */
    app: {
      /**
       * Navigation to a page. Page can be any string. Event handler validates
       * the page.
       */
      [P in `to_${Page}`]: void;
    } & {
      /**
       * User clicks back/forward buttons. Payload is the state object of the
       * history entry.
       */
      popstate: { page: string };
      logout: void;
    };
  }
}
