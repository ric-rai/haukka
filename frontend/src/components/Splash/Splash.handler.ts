import { State } from '../../state/state'
import { Event } from '../../events'

export function handleSplashEvent(state: State, event: Event['splash']): State {
  switch (event.name) {
    case 'splash/to_login': {
      if (state.isLogged) return state
      return state
    }
  }
}
