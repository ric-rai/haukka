import { State } from '../../state/state'
import { Event } from '../../events'

/** This splash screen will be shown if the user is not logged in. */
export interface Splash {
  (props: {
    state: {
      /** Splash screen is shown if State.isLogged is false. */
      isLogged: State['isLogged']
    }
    dispatch: (event: Event['splash']) => void
  }): JSX.Element | null
}
