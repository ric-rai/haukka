type _Event = {
  [P in keyof EventIndex]: ScopedEventIndex<P, EventIndex[P]>;
};

type _Events = {
  [P in keyof _Event]: _Event[P][keyof _Event[P]];
};

export type Events = _Event & {
  any: _Event[keyof _Event];
};

export type Event = _Events & {
  any: _Events[keyof _Events];
};

/** Creates a scoped event index type. */
type ScopedEventIndex<
  Scope extends string,
  EventIndex extends Record<string, object | string | void>
> = {
  [P in keyof EventIndex as `${Scope}/${P}`]: EventIndex[P] extends void
    ? { name: `${Scope}/${P}` }
    : {
        name: `${Scope}/${P}`;
        payload: EventIndex[P];
      };
};
