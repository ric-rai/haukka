import { State } from '../../state/state'
import { Event } from '../../events'

export function handleSplashEvent(
  state: State,
  event: Event['splash'],
  dispatch: (event: Event['splash'] | Event['app']) => void
): State {
  switch (event.name) {
    case 'splash/set_jwt':
      dispatch({ name: 'app/to_front_page' })
      return { ...state, isLogged: true, jwt: event.payload }
  }
}
