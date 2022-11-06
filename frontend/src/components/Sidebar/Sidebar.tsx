import { Sidebar as Type } from './Sidebar.type'
import React from 'react'
import { Page } from '../../state/state'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

export const Sidebar: Type = ({ children, state, dispatch }) => {
  const { sidebarSelection, isSidebarOpen } = state

  return (
    <sidebar-x class={isSidebarOpen ? 'open' : 'closed'}>
      <Drawer variant="permanent">
        <Divider />
        <List>
          {React.Children.map(children, (Child) => {
            const page = Child.props.page as Page
            return (
              <ListItem
                key={page}
                className={`${sidebarSelection === page ? 'selected' : ''}`}
              >
                <ListItemButton
                  onClick={() => dispatch({ name: `app/to_${page}` })}
                >
                  <ListItemIcon>{Child.props.icon}</ListItemIcon>
                  <ListItemText primary={Child} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Drawer>
    </sidebar-x>
  )
}
