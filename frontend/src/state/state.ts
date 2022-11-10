import { Translation } from '../lang/lang'

export enum PAGES {
  __,
  front_page,
  list_days,
  manual,
}

export type Page = keyof Omit<typeof PAGES, '__'>

export type State = {
  lang: Translation
  isDark: boolean
  isLogged: boolean
  sidebarSelection: Page
  isSidebarOpen: boolean
  user: null | { name: string }
  jwt: null | string
}
