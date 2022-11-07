declare global {
  interface EventIndex {
    /** Keys are the names of the events, and values are payloads. */
    splash: {
      /**
       * User wants to login. This will redirect the user to laji.fi for
       * authentication.
       */
      set_jwt: string
    }
  }
}

export {}
