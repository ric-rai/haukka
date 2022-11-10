import { fi } from '../lang/fi'
import { State } from './state'

export const initialState: State = {
  lang: fi,
  sidebarSelection: 'front_page',
  isSidebarOpen: false,
  isDark: true,
  jwt: null,
  user: null,
  isLogged: false,
}
