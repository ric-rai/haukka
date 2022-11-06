import { Events } from '../../events'

/**
 * The header bar is the topmost element on the app and it's always visible. It
 * contains: the title of the app, a button to toggle expanded view for the
 * sidebar, name of the user, and a logout button.
 */
export interface Header {
  (props: {
    state: {
      isSidebarOpen: boolean
      /** Name of the user. */
      name?: string
    }
    dispatch: (
      event: (Events['header'] & Events['app'])[
        | 'header/toggle_sidebar'
        | 'header/toggle_dark_mode'
        | 'app/logout']
    ) => void
    /** Title of the app. */
    children: string
  }): JSX.Element
}
