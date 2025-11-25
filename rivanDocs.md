# Rivan Notes

## Yleiskuva / Summary

Tässä dokumentissa on lyhyet muistiinpanot projektin tilasta. Pääkohdat:

- Turva-asiat ymmärretty ja osaaminen olemassa.
- Kieli-valinta (localisation/i18n) ei toimi tällä hetkellä; jätetty pois, koska projekti-aika on rajallinen.
- Dark mode toimii hienosti.
- Muuten kaikki toimii hyvin (UI, pelilogiikka, tiedon haku).

---

## Tilanne (Status)

- ✅ Security fundamentals understood (turvallisuusasiat)
- ❌ Language selector / i18n — _not working / skipped_
- ✅ Dark mode — working well
- ✅ Main gameplay mechanics — functioning

---

## Havainnot / Observations

- Kielivalinta (Language selector)
  - Implementoitu, mutta ei luotettava (monimutkaisia työkalutoistoja ja aikaongelmia).
  - Päätettiin palauttaa / poistaa, jos se aiheuttaa regressioita.

- Modalit ja korttirakenteet
  - Pokemon-modal lisätty ja testattu (otsikko, detaljit, fetch species + pokemon).
  - Korttien ulkoasu responsiivinen, hover-efektit ja accessibility huomioitu.

---

## Seuraavat askeleet (Next steps)

1. (Valinnainen) i18n: Jos haluat palauttaa kielivalinnan, tehdään se erillisessä branchissa ja minimoidaan muutokset, jotta se ei riko olemassa olevaa logiikkaa.
2. Siistiä: Poista mappien ja komponenttien käyttämättömät importit ja réfaktoroi (lint warnings).
3. Lisää yksinkertainen integroitu tuki Bulbapedia-linkille Pokemon-nimen klikkauksessa (tehty).
4. Lisätään lisää testejä (unit/integration) kriittisille funktioille (fetch, loadNewPokemon, guess).

---

## Komentorivit (Helpful commands)

```
npm run dev     # dev server
npm run lint    # eslint checks
npm run build   # build for production
```

---

## Muistiinpanot / Misc

- Jos kielivalinta palautetaan, suositeltavaa:
  - Käyttää i18next + react-i18next
  - Tallentaa valinta localStorageen
  - Testata palautus/virhetilat

---

Kiitos, kaikki toimii muuten hyvin! Jos haluat, autan palauttamaan i18n turvallisesti ja vaiheittain.

---

_Luotu: rivanDocs (parannettu ulkoasu)_
