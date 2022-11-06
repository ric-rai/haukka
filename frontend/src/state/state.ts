export enum PAGES {
  __,
  frontpage,
  list_days,
  manual,
}

export type Page = keyof Omit<typeof PAGES, "__">;

export type State = {
  isDark: boolean;
  isLogged: boolean;
  sidebarSelection: Page;
  user: null;
  idToken: null | string;
};
