export {}
declare global {
  interface EventIndex {
    /** Keys are the names of the events, and values are payloads. */
    sidebar: {
      close: void
    }
  }
}
