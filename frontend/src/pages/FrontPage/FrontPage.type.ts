import { Translation } from '../../lang/lang'

export interface FrontPage {
  (props: { state: { lang: Translation } }): JSX.Element
}
