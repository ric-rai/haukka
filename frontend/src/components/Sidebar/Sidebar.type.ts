import { State } from '../../state/state'
import { PageLink } from '../PageLink/PageLink.type'
import { Event } from '../../events'

export interface Sidebar {
  (props: {
    children: ReturnType<PageLink>[]
    state: {
      sidebarSelection: State['sidebarSelection']
      isSidebarOpen: boolean
    }
    dispatch: (
      event:
        | Event['sidebar']
        | Extract<Event['app'], { name: `app/to_${string}` }>
    ) => void
  }): JSX.Element
}
