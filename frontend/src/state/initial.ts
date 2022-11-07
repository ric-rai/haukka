import { State } from './state'

export const initialState: State = {
  sidebarSelection: 'front_page',
  isSidebarOpen: false,
  isDark: true,
  jwt: null,
  user: null,
  isLogged: false,
}
