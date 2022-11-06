import { State } from '../../state/state'
import { Event } from '../../events'

export function handleHeaderEvent(state: State, event: Event['header']): State {
  switch (event.name) {
    case 'header/toggle_dark_mode':
      return { ...state, isDark: !state.isDark }
    case 'header/toggle_sidebar':
      return { ...state, isSidebarOpen: !state.isSidebarOpen }
  }
}
