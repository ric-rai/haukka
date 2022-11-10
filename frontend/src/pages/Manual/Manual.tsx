import { Manual as Type } from './Manual.type'
import { Paper } from '@mui/material'

export const Manual: Type = ({ state }) => {
  const { lang } = state

  return (
    <manual-x>
      <div>
        <Paper>
          <h2>{lang.manualTitle}</h2>
          <div>
            Lintuasemasovellus Haukka toimii selaimessa eikä sitä tarvitse
            erikseen asentaa. Sovellus tarvitsee toimiakseen Internet-yhteyden.
            Lisätäkseen ja selatakseen sovelluksen tietoja käyttäjän tulee
            kirjautua sisään. Sovellukseen voi tunnistautua mm. Laji.fi- sekä
            Google-tunnuksilla. Sisäänkirjautuminen tapahtuu login-sivulta jonne
            sisäänkirjautumaton käyttäjä ohjataan automaattisesti.
            Uloskirjautuminen tapahtuu sovelluksen oikeasta yläkulmasta.
            <br-x2 />
            Sovelluksen listausnäkymät näyttävät tietoa ainoastaan käyttäjän
            valitsemalta lintuasemalta, ja käyttäjän lisäämät havainnot ja
            päivät tallennetaan kyseiselle lintuasemalle. Ensimmäisellä
            kirjautumiskerralla käyttäjälle näytetään valikko, josta käyttäjä
            valitsee lintuaseman, jonka tietoja käyttäjä haluaa käyttää.
            Käyttäjä voi myöhemmin vaihtaa lintuasemaa sovelluksen oikeasta
            yläkulmasta.
          </div>
          <h2>Päivän ja havaintojen lisääminen</h2>
          <div>
            Sovelluksen etusivulta löytyy päivä- ja havaintotietojen lisäämistä
            varten lomake. Käyttäjä valitsee kalenterista tai kirjoittaa
            päivämäärän jolle havaintojaksot lisätään. Oletuksena sovelluksessa
            on valittuna kuluvan päivän tiedot. Jos päivä löytyy jo
            tietokannasta, sovellus näyttää kyseiselle päivälle tallennetut
            havainnoijat, kommentit, havaintoaktiivisuuden ja pyydystiedot.
            Käyttäjä voi halutessaan päivittää nämä mieleisikseen. Kommentti-,
            havaintoaktiivisuus- ja pyydystiedot on oletuksena piilotettu, mutta
            ne saa avattua klikkaamalla niiden otsikkoa. Jos päivää ei ole
            lisätty tietokantaan aiemmin, uusi päivä luodaan. Käyttäjän tulee
            kirjoittaa päivälle havainnoija(t). Kommenttikenttä sekä
            havaintoaktiivisuus- ja pyydystiedot ovat vapaaehtoisia.
            Havaintoaktiivisuus- ja pyydystiedot ovat lintuasemakohtaisia.
            <br-x2 />
            Havaintoaktiivisuus valitaan valintapainikkeilla tai kirjoittamalla
            pyydetty numeroarvo.
            <br-x2 />
            Pyydystietojen kirjaaminen aloitetaan valitsemalla pyydyksen tyyppi
            ja pyyntialue, minkä jälkeen käyttäjältä kysytään kyseiseen
            pyydykseen liittyvät lisätiedot.
            <br-x2 />
            Varsinaisia havaintoja lisätäkseen käyttäjän tulee valita
            lisättävien havaintojaksojen tyyppi sekä havaintopaikka, jossa
            havaintojaksot on kirjattu. Nämä valinnat tapahtuvat
            pudotusvalikoista pikakirjoituslomakkeen yläpuolelta.
            <br-x2 />
            Havaintojaksot ja niiden sisältämät havaintojaksot kirjataan
            kronologisessa järjestyksessä pikakirjoituskenttään. Havainnot ja
            jaksot syötetään pikakirjoitusmuodossa:
            <br />
            (havaintojaksun alku- ja loppuaika sekä näiden välissä yksi laji per
            rivi)
          </div>
          <em>
            <br />
            10:00
            <br />
            sommol 1/2 W
            <br />
            11:00
            <br />
            grugru 3ad/2juv/5subad s +-
            <br />
            12:00
            <br />-
            <br />
            13:00
            <br />
            cotcot 3 W
            <br />
            13:30
            <br />
            tauko
            <br />
            14:00
          </em>
          <br-x2 />
          <div>
            Havainnot kirjataan siis aina kahden kellonajan väliin, ja nämä
            kellonajat toimivat havaintojakson alku- ja loppuaikoina. Jos uusi
            havaintojakso alkaa heti edellisen jakson päätyttyä, ei aloitusaikaa
            tarvitse kirjoittaa uudelleen. Esimerkissä kello 12-13 suoritettiin
            havainnointia, mutta havaintoja ei ollut, joten kyseisen
            havaintojaksoon on merkitty vain viiva. Myös tauot voi halutessaan
            kirjata kirjoittamalla <em>tauko</em> - tällöin kyseiselle
            havaintojaksolle ei voi kirjata varsinaisia havaintoja. Pelkkää
            taukojaksoa, ilman varsinaisia havaintojaksoja, ei voi ilmoittaa.
            <br-x2 />
            Jos pikakirjoituslomakkeessa on virheitä, sovellus ilmoittaa tästä
            keltaisella varoitusikkunalla ja pyytää tarkistamaan
            pikakirjoituksen oikeellisuuden. Varoitusikkunassa kerrotaan,
            millaisen virheen sovellus pikakirjoituksessa havaitsi. Muiden
            kenttien virheistä ilmoitetaan kyseisen kentän yhteydessä punaisella
            varoitusvärillä. Tallenna-nappi aktivoituu painettavaksi, kun
            havaintolomakkeessa ei ole virheitä ja vaaditut kentät on täytetty.
            Napin painalluksen myötä päivä ja siihen liittyvät tiedot
            tallentuvat tietokantaan. Tällä hetkellä (01.07.2022) sovellus antaa
            vääränlaisen virheilmoituksen, jos havainnointijaksoa aloittavan
            kellonajan perään laitetaan välilyöntejä tai muuta tyhjää tilaa. Jos
            pikakirjoitus tuntuu olevan oikein ja sovellus herjaa kuitenkin,
            varmista, että kellonaikojen perässä ei ole välilyöntejä ja poista
            backspacella tyhjät merkit.
          </div>
          <h2>Päivien ja havaintojen selaaminen</h2>
          Viimeisimmät viisi päivää näkyvät sivupalkissa sovelluksen etusivulla,
          ja niihin päästään siirtymään klikkaamalla. Muita päiviä pääsee
          selaamaan Näytä päivät -linkin kautta. Avautuvassa listassa näkyvät
          kaikki valitulle lintuasemalle tallennetut päivät aikajärjestyksessä,
          sekä päiviin liittyvät havainnoijat ja kommentit.
          <br-x2 />
          Päivää klikkaamalla päästään tarkastelemaan kyseiseen päivään
          liittyvää yhteenvetoa. Yhteenvetosivulla näkyy päivän havainnoijat,
          kommentti, havaintoaktiivisuus ja pyydystiedot. Sivulta löytyy myös
          kaksi yhteenvetotaulukkoa (lajit ja jaksot), joiden välillä liikutaan
          nappia painamalla.
          <br-x2 />
          Lajit-taulukossa näkyvät kaikki kyseisenä päivänä havaitut lajit
          kultakin havaintojaksotyypiltä. Jaksot-taulukossa taas näkyvät kunkin
          jakson tiedot kyseiseltä päivältä. Jaksoa klikkaamalla aukeaa ikkuna,
          jossa on yhteenveto jakson aikana tehdyistä havainnoista. Ikkuna
          sulkeutuu klikkaamalla sen ulkopuolelle. Jaksorivin lopussa on myös
          kynäikoni, josta kyseistä havaintojaksoa pääsee muokkaamaan.
          <br-x2 />
          <h2> Paikallisten ja hajahavaintojen muokkaaminen</h2>
          Paikallisia havaintoja ja hajahavaintoja voi muokata lajikohtaisesti
          syöttämällä lajin rivillä oleviin kenttiin halutut arvot. Arvot
          tallentuvat tietokantaan, kun käyttäjä klikkaa pois kentästä.
          <h2>Päivän ja havaintojen tietojen muokkaaminen</h2>
          <div>
            Havainnoijien, kommentin, havaintoaktiivisuuden ja pyydystietojen
            muokkaaminen tapahtuu yhteenvetosivulta. Havainnoija(t), Kommentti
            ja Havaintoaktiivisuus -kenttien vieressä olevia kynäikoneja
            painamalla aukeavat muokkauskentät, joiden avulla tietoja voidaan
            päivittää.
            <br-x2 />
            Pyydystietoihin voi lisätä uusia pyydyksiä painamalla pyydysosion
            oikeassa yläkulmassa olevaa vihreää pluspainiketta (+). Jo lisättyä
            yksittäistä pyydystä pääsee muokkaamaan painamalla pyydysrivin
            lopussa olevaa vihreää kynäikonia. Lisätyn yksittäisen pyydysrivin
            voi poistaa menemällä muokkaustilaan ja painamalla rivin loppuun
            ilmestyvää punaista rastipainiketta (x).
            <br-x2 />
            Jaksojen ja havaintojen muokkaaminen tapahtuu Jaksot-näkymästä. Etsi
            havaintojakso, jota haluat muokata, ja paina kyseisen
            havaintojaksorivin lopussa olevaa kynäikonia. Havaintojakson
            muokkaustila aukeaa, ja voit muokata kyseisen havaintojakson
            tyyppiä, sijaintia sekä pikakirjoitusta. Poista-napin kautta
            havaintojakso voidaan myös kokonaan poistaa. Halutessaan käyttäjä
            voi muokata havaintoja myös havaintotyyppi- ja -paikkakohtaisesti
            taulukon yläpuolella olevasta <em>Muokkaa havaintoja</em>
            -painikkeesta.
            <br-x2 />
          </div>
        </Paper>
      </div>
    </manual-x>
  )
}
