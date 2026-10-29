# From Pengudang, With love

Website promoting the home cooking classes run by the women (Ibus) of Pengudang, a fishing village on Bintan island, Indonesia. Built from the group's Canva design. Plain HTML/CSS/JS, no build step, hosted on GitHub Pages.

## Pages
| Page | File |
|---|---|
| Home: intro, classes, Ibus, reviews, booking form | `index.html` |
| Menu + story behind each dish | `menu.html` (dish pages are `menu.html#otak-otak` etc.) |
| Cooking classes + booking | `classes.html` |
| Map of Pengudang, landmarks, guests' photos | `map.html` |
| Pengudang Passport (stamps, photos, download) | `passport.html` |

Every page has an **EN / ID** switch (top right). The choice is remembered.

## Editing content
Almost everything lives in **`js/data.js`**: classes, dishes, Ibus, reviews, landmarks (and their position on the map). Each text has an `en` and `id` version.
Interface text (titles, buttons, form labels) is in **`js/i18n.js`**.

## Still to fill in
- [ ] **Booking contact**: set `CONTACT.whatsapp` (e.g. `"6281234567890"`) or `CONTACT.email` at the top of `js/data.js`. Until then the form shows "booking isn't connected yet".
- [ ] Ibu names and bios (`IBUS`)
- [ ] Class prices (`[Price]`) and confirm durations / dish combinations (`CLASSES`)
- [ ] Landmarks 2–4: names, descriptions, map positions (`LANDMARKS`)
- [ ] More reviews (`REVIEWS`; with 2+ they rotate automatically)
- [ ] Check dish stories with the Ibus. Otak-Otak is from the Canva; the others are general background on each dish, written as drafts.

## Photos
Drop images into `images/` with these names (any missing photo shows a placeholder):

```
images/ibus/ibu-1.jpg, ibu-2.jpg
images/reviews/review-1.jpg
images/dishes/otak-otak.jpg, keropok-amplang.jpg, ikan-bakar.jpg, ayam-goreng.jpg, nasi-uduk.jpg, urap.jpg, kueh-lapis.jpg
images/classes/seafood.jpg, home-cooking.jpg, kueh-lapis.jpg
images/landmarks/birds-nest-farm.jpg, landmark-2.jpg, landmark-3.jpg, landmark-4.jpg
images/guests/guest-1.jpg, guest-2.jpg
```
Square photos work best for dishes and Ibus; landscape (4:3) for everything else. Keep each under ~500 KB.

## Passport
Stamps and photos are saved only in the visitor's own browser (no server). Visitors collect a stamp per landmark on the map, one for joining a class, and one for adding a photo, then can download their passport as an image to share.

## Fonts & graphics
- Fonts (self-hosted, Open Font License): **Allison** (script titles), **Cormorant Garamond** (nav, sub-headings), **Arimo** (body). Closest free matches to the Canva fonts.
- Fish school, village skyline, island map, globe and placeholder graphics are original SVGs in `images/graphics/`.

## Run locally
```
python3 -m http.server
```
then open http://localhost:8000
