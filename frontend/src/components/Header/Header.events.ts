export {}
declare global {
  interface EventIndex {
    /** Keys are the names of the events, and values are payloads. */
    header: {
      toggle_dark_mode: void
      toggle_sidebar: void
    }
  }
}
