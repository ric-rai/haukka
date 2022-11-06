import { State } from '../../state/state'

export interface PageLink {
  (props: {
    children: string
    page: State['sidebarSelection']
    icon: JSX.Element
  }): JSX.Element
}
