# Seven Stones Restaurant website

React + Vite site for Seven Stones Restaurant, Barsha Heights (TECOM), Dubai.
All menu content, prices and contact details come from the restaurant's printed menu card.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build
```

Node 20.19 or newer.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Vercel detects Vite automatically (build `npm run build`, output `dist`). Click **Deploy**.

`vercel.json` is included and sets long-term caching for the images.

## Where things live

| What | File |
| --- | --- |
| Menu items, prices, categories | `src/data/menu.js` |
| Address, phones, WhatsApp, hours, social links | `src/data/business.js` |
| Dish photos (cropped from the menu card) | `public/img/<item number>.webp` |
| Pages | `src/pages/` (Home, MenuPage, About, Gallery, Contact, NotFound) |
| Shared parts | `src/components/` (Header, Footer, OrderBar, MenuItem, Marquee, Badge, Lightbox) |
| Colours, type, animations | `src/styles/global.css` (tokens, buttons, reveal, marquee) and one CSS file per page |
| Page routing | `src/router.jsx` |

Each menu line is `number | name | price | note`. Prices can be one number (`17`), several unnamed prices (`13/15`), named options (`Chicken 18, Beef 20`) or `ASP`.
To add a photo for an item, save it as `public/img/<number>.webp`, add the number to `PHOTOS` in `menu.js`, and add its size to `src/data/photoSizes.js`.

## Pages

| URL | Page |
| --- | --- |
| `/` | Home: animated hero, house favourites, menu sections, juice bar, order call-to-action |
| `/menu` | Full menu with search, sticky section bar and the order list. `/menu?cat=juices` opens at a section |
| `/about` | Story, numbers, how ordering works |
| `/gallery` | Filterable photo grid with a lightbox |
| `/contact` | Contact us: phone and WhatsApp cards, address, hours, map, social links |

`vercel.json` rewrites every path to `index.html`, so links and page refreshes work on Vercel.
Page changes use the browser's View Transitions where supported. All motion is switched off for visitors who set "reduce motion" on their device.

## Social media

Instagram, Facebook and TikTok links live in `src/data/business.js` under `social`. Paste each full profile URL there and the icons become live everywhere: the footer, the mobile menu, the home page "Follow" section and the Contact us page. WhatsApp and Google Maps are already linked.

## Ordering

Customers tap **+** to build a list, then send it to one of the two WhatsApp numbers as a pre-written message. There is no checkout or online payment. The restaurant confirms the order in the chat.

## Check with the restaurant before going live

Items marked **to confirm** on the site. When they're settled, update the data and set `SHOW_CONFIRM_MARKERS = false` in `src/data/business.js` to hide every tag.

**Business details**
- Opening hours: the card only shows a "24 hours" badge. The site says "Open 24 hours".
- Map pin: placed by searching "Art XII Building, Barsha Heights, Dubai". Check that it lands on the restaurant.
- Instagram, Facebook and TikTok: the card shows Instagram and Facebook icons with the name "Seven Stone" but no handle, and no account could be verified online. Add the full URLs in `business.js`. Until then they show as "link to add" placeholders.

**Menu**
- 65 Sherry Biryani, 114 King Fish / Sherry Fry, 318 Grilled Sherry, 319 Grilled Seabream, 320 Tilapia Grilled: card shows "ASP". The site shows "Ask".
- 70 Chicken Mugalgal (18/22), 142 Tandoori Chicken (18/32), 188 Lemon Coriander Noodles (16/18), 189 Cream of Mushroom Soup (16/18), 201 Hummus (7/14), 325 Mixed Grill (49/69/115), 443 French Fries (8/14/22): several prices with no size or option named.
- 332 Lamb Chops: English says 4 pcs, Arabic says 8 pcs.
- 335 Chicken Wings: English says 12 pcs, Arabic says 8 pcs.
- 266 Kare Kare: note printed as "Coxtrife w. meat w. rice".
- 284: printed as "Soaps Sapathon".
- Tea & coffee and fresh juices list 2 or 3 prices without naming the cup or glass sizes. The site explains this once at the top of each category.
- Milk shakes 486 to 489 are listed as one item (AED 15, four flavours), as on the card.

## Credits

Photos: Seven Stones menu card. Font: Archivo (SIL Open Font License, `public/fonts/OFL.txt`), self-hosted.
