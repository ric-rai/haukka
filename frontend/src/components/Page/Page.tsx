import { Page as Type } from './Page.type'

import { FrontPage } from '../../pages/FrontPage/FrontPage'
import { ListDays } from '../../pages/ListDays/ListDays'
import { Manual } from '../../pages/Manual/Manual'

export const Page: Type = ({ dispatch, state }) => {
  const { sidebarSelection } = state
  const { lang } = state

  const pages = {
    front_page: () => <FrontPage state={{ lang }} />,
    list_days: ListDays,
    manual: () => <Manual state={{ lang }} />,
  }

  return <page-x>{pages[sidebarSelection]()}</page-x>
}
