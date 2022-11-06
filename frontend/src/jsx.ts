/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  /**
   * Includes typings for intrinsic JSX elements.
   *
   * @see {https://www.typescriptlang.org/docs/handbook/jsx.html}
   */
  namespace JSX {
    type Children = (Element | string | null)[] | Element | string | null

    interface IntrinsicElements {
      [key: string]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
      > & { class?: string }
    }
  }
}

export default JSX
