import { State } from '../../state/state'
import { Event } from '../../events'

export interface Page {
  (props: {
    state: State
    dispatch: (event: Event['any']) => void
  }): JSX.Element
}
