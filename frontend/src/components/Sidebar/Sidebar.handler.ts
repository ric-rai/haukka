import { State } from '../../state/state'
import { Event } from '../../events'

export function handleSidebarEvent(
  state: State,
  event: Event['sidebar']
): State {
  switch (event.name) {
    case 'sidebar/close':
      return { ...state, isSidebarOpen: false }
  }
}
