import { PAGES, Page, State } from "./state/state";
import { Event } from "./events";
import { snakeToKebab, snakeToSentence } from "./utils/string";

let currentPage: null | string = null;

export function handleAppEvent(state: State, event: Event["app"]): State {
  const page = event.name.split("to_")[1] as Page;
  if (PAGES[page]) {
    if (currentPage !== page) {
      currentPage = page;
      const url = `${window.location.origin}#${snakeToKebab(page)}`;
      document.title = snakeToSentence(page);
      history.pushState({ page }, "", url);
    }
    return { ...state, sidebarSelection: page };
  }

  if (event.name === "app/popstate") {
    const page = event.payload?.page as void | Page;
    if (!page || state.sidebarSelection === page) return state;
    return { ...state, sidebarSelection: page };
  }

  if (event.name === "app/logout") {
    if (!state.isLogged) return state;
    return state;
  }

  console.error(`Unknown app event: ${event.name}`);
  return state;
}
