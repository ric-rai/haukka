import { State } from '../../state/state'
import { Events } from '../../events'

export interface Page {
  (props: {
    state: State
    dispatch: (event: Events['any']) => void
  }): JSX.Element
}
