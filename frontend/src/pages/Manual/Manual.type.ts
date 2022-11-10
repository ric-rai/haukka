import { Translation } from '../../lang/lang'

export interface Manual {
  (props: { state: { lang: Translation } }): JSX.Element
}
