import { Header as Type } from './Header.type'
import MuiAppBar from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Drawer from '@mui/material/Drawer'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'

export const Header: Type = ({ children, state, dispatch }) => {
  const { name, isSidebarOpen } = state

  return (
    <header-x>
      <Drawer
        variant="permanent"
        className={`sidebar-header ${isSidebarOpen ? 'open' : 'closed'}`}
      >
        <IconButton onClick={() => dispatch({ name: 'header/toggle_sidebar' })}>
          <ChevronLeftIcon />
        </IconButton>
      </Drawer>
      <MuiAppBar>
        <IconButton
          className="sidebar-open-button"
          onClick={() => dispatch({ name: 'header/toggle_sidebar' })}
        >
          <MenuIcon />
        </IconButton>
        <h1>{children}</h1>
        <span className="right">
          <FormControlLabel
            control={
              <Switch
                onClick={() => dispatch({ name: 'header/toggle_dark_mode' })}
              />
            }
            label="Dark mode"
          />
          {name}
          <Button
            className="logout"
            onClick={() => dispatch({ name: 'app/logout' })}
          >
            Kirjaudu ulos
          </Button>
        </span>
      </MuiAppBar>
    </header-x>
  )
}
