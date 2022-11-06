/// <reference types="react-scripts" />

import { Splash as Type } from './Splash.type'
import { Button, Paper } from '@mui/material'
import { ReactComponent as HaukkaLogoCircle } from '../../assets/img/haukka-logo-circle.svg'
import luomus_logo from '../../assets/img/luomus-logo.png'

export const Splash: Type = ({ state, dispatch }) => {
  const { isLogged } = state

  return isLogged ? null : (
    <splash-x>
      <Paper>
        <Paper elevation={2} className="container">
          <div className="header-image"></div>
          <div className="logo-container">
            <HaukkaLogoCircle />
          </div>
          <Button variant="contained" onClick={() => void 0}>
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
