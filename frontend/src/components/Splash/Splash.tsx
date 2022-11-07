/// <reference types="react-scripts" />

import { Splash as Type } from './Splash.type'
import { Button, Paper } from '@mui/material'
import { ReactComponent as HaukkaLogoCircle } from '../../assets/img/haukka-logo-circle.svg'
import luomus_logo from '../../assets/img/luomus-logo.png'

const loginUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8080/login'
    : '/login'

export const Splash: Type = ({ state, dispatch }) => {
  const { isLogged } = state

  const hash = window.location.hash.replace('#/', '')
  if (hash.startsWith('?jwt=')) {
    dispatch({ name: 'splash/set_jwt', payload: hash.split('?jwt=')[1] })
  }

  return isLogged ? null : (
    <splash-x>
      <Paper>
        <Paper elevation={2} className="container">
          <div className="header-image"></div>
          <div className="logo-container">
            <HaukkaLogoCircle />
          </div>
          <Button variant="contained" href={loginUrl}>
            Kirjaudu sisään
          </Button>
          <p>
            Tervetuloa lintuasemasovellus Haukkaan. Suomessa sijaitsee 16
            lintuasemaa. Lintuasemasovelluksen avulla käyttäjä voi kirjata
            lintuasemilla tehtyjä lintujen havaintotietoja vakioidussa muodossa.
            Havaintojen tallentaminen järjestelmään vaatii sisäänkirjautumisen.
          </p>
          <a href="https://www.luomus.fi/">
            <img src={luomus_logo} width="200" alt="luomus"></img>
          </a>
        </Paper>
      </Paper>
    </splash-x>
  )
}
