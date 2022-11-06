declare global {
  interface EventIndex {
    /** Keys are the names of the events, and values are payloads. */
    splash: {
      /** User wants to login. */
      to_login: void
    }
  }
}

export {}
