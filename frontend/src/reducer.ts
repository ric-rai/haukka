import { State } from './state/state'
import { Event } from './events'

import { handleAppEvent } from './App.handler'

export const reducer =
  (dispatchRef: { current: undefined | ((value: Event['any']) => void) }) =>
  (state: State, event: Event['any']): State => {
    const { current: dispatch } = dispatchRef
    if (!dispatch) throw new Error('Dispatch ref is not set!')

    const type = event.name.split('/')[0] as keyof EventIndex

    const handleEvent = (type: keyof EventIndex): State => {
      switch (type) {
        case 'app':
          return handleAppEvent(state, event as Event['app'])
      }
    }

    return handleEvent(type)
  }
