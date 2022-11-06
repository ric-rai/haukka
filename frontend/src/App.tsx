import { useEffect, useReducer, useRef } from 'react'
import './App.scss'

// State management and events
import { PAGES, Page as PageNames } from './state/state'
import { initialState } from './state/initial'
import { reducer } from './reducer'
import { Event } from './events'

// Components
import { Body, Splash, Header, Sidebar, PageLink } from './components'
import { Main, Page } from './components'

// Utils
import { kebabToSnake, snakeToSentence } from './utils/string'

// MUI
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

//Icons
import { Home, ViewDay, Help } from '@mui/icons-material'

function App() {
  const dispatchRef = useRef<(value: Event['any']) => void | null>()
  const [state, dispatch] = useReducer(reducer(dispatchRef), initialState)
  if (!dispatchRef.current) dispatchRef.current = dispatch

  const { isDark, isLogged, sidebarSelection, user, isSidebarOpen } = state

  // Navigate to the right page when app is loaded.
  const page = kebabToSnake(window.location.hash.replace('#', '')) as PageNames
  if (!page) dispatch({ name: `app/to_front_page` })
  if (PAGES[page] && sidebarSelection !== page)
    dispatch({ name: `app/to_${page}` } as Event['app'])

  // Navigate to the right page when user clicks back/forward buttons.
  useEffect(() => {
    addEventListener('popstate', (event) =>
      dispatch({ name: 'app/popstate', payload: event.state })
    )
  }, [])

  useEffect(() => {
    if (state.isDark) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }, [state.isDark])

  const darkTheme = createTheme({
    palette: { mode: isDark ? 'dark' : 'light' },
  })

  const pageIcons = {
    front_page: <Home />,
    list_days: <ViewDay />,
    manual: <Help />,
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Splash {...{ dispatch, state: { isLogged } }} />
      <Header
        {...{ dispatch, state: { name: user?.name, isSidebarOpen, isDark } }}
      >
        Haukka
      </Header>
      <Body>
        <Sidebar {...{ dispatch, state: { sidebarSelection, isSidebarOpen } }}>
          {(Object.keys(pageIcons) as PageNames[]).map((page) => (
            <PageLink key={page} page={page} icon={pageIcons[page]}>
              {snakeToSentence(page)}
            </PageLink>
          ))}
        </Sidebar>
        <Main>
          <Page state={state} dispatch={dispatch} />
        </Main>
      </Body>
    </ThemeProvider>
  )
}

export default App
