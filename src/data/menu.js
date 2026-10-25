/*
 * Seven Stones Restaurant — menu data
 * Transcribed from the printed menu card (12 pages, "share-…-seven-stone-.pdf").
 * Item numbers match the card so customers can quote them when ordering.
 *
 * Line format:  number | name | price | note
 *   price  "17"                         single price (AED)
 *          "1.50/4/6"                   several prices, sizes NOT named on the card
 *          "Veg 16, Chicken 18"         several prices with the labels printed on the card
 *          "ASP"                        card says ASP (price on request)
 *   note   optional description / what's included, taken from the card
 *
 * Anything marked `confirm` could not be read with certainty, or the card is
 * ambiguous. These are shown with a "to confirm" tag while
 * SHOW_CONFIRM_MARKERS is true in src/data/business.js.
 */

// Dish photos cropped from the menu card (public/img/<number>.webp)
const PHOTOS = new Set(
  `34 35 36 37 38 39 40 63 64 65 66 67 68 69 70 71 72 73 74 98 102 133 134 135 136 137 138 139 140 141 142
  170 171 172 173 174 175 176 177 178 179 180 181 198 199 200 201 202 203 204 206 207 208 214 247 248 249 250
  251 252 253 254 255 256 286 287 288 289 290 291 292 293 294 295 296 297 298 299 300 308 309 310 311 312 313
  314 315 316 317 318 319 320 321 322 323 324 325 326 327 328 329 330 331 332 333 334 335 336 337 338 340 341
  342 343 344 345 346 347 348 349 350 351 352 353 354 355 356 357 370 371 372 373 374 375 376 377 378 379 380
  381 382 383 384 385 386 387 388 389 390 391 392 393 399 400 401 402 403 404 405 406 407 408 409 410 411 412
  413 414 415 416 417 418 419 420 421 422 423 424 425 426 427 428 429 430 431 432 433 434 435 436 437 438 439
  440 441 442 443 444 445 446 447 448 449 450 451 452 453 454 455 456 457 458 459 460 461 462 463 464 465 466
  467 468 469 470 471 472 473 474 475 476 477 478 479 480 481 482 483 484 485 486 490 491 493 494 495 496 497
  498 499 500 501 502 503 504 507 508 509 510 511 512 513 514 515 516 517 518 519 520 521 522 523 524 525 526
  527 533 539 540 541 542`
    .split(/\s+/)
    .filter(Boolean)
    .map(Number),
)

// Ambiguities found while transcribing — keyed by item number
const CONFIRM = {
  65: 'Card shows "ASP" (price on request)',
  70: 'Two prices printed (18/22); the options are not named',
  114: 'Card shows "ASP" (price on request)',
  142: 'Two prices printed (18/32); probably half / full — not stated',
  201: 'Two prices printed (7/14); portion sizes are not named',
  266: '"Coxtrife" is printed as shown on the card — wording unclear',
  284: 'Printed as "Soaps Sapathon" — check the spelling',
  318: 'Card shows "ASP" (price on request)',
  319: 'Card shows "ASP" (price on request)',
  320: 'Card shows "ASP" (price on request)',
  325: 'Three prices printed (49/69/115); sizes are not named',
  332: 'English says 4 pcs, the Arabic line says 8 pcs',
  335: 'English says 12 pcs, the Arabic line says 8 pcs',
  443: 'Three prices printed (8/14/22); sizes are not named',
  188: 'Two prices printed (16/18); the options are not named',
  189: 'Two prices printed (16/18); the options are not named',
}
function parsePrice(raw) {
  const s = raw.trim()
  if (/^ASP$/i.test(s)) return { kind: 'asp' }
  if (/^[\d.]+$/.test(s)) return { kind: 'single', options: [{ label: '', price: Number(s) }] }
  if (/^[\d.]+(\/[\d.]+)+$/.test(s))
    return { kind: 'multi', named: false, options: s.split('/').map((p) => ({ label: '', price: Number(p) })) }
  // "Veg 16, Chicken 18"
  const options = s.split(',').map((part) => {
    const m = part.trim().match(/^(.*?)\s+([\d.]+)$/)
    if (!m) throw new Error(`Bad price: ${raw}`)
    return { label: m[1], price: Number(m[2]) }
  })
  return { kind: 'multi', named: true, options }
}

function parse(block, extra = {}) {
  return block
    .trim()
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [no, name, price, note] = line.split('|').map((x) => x?.trim())
      const n = Number(no)
      // Tea and juice sizes are explained once in the category note instead
      const confirm = CONFIRM[n]
      const photo = extra.photoFor?.(n) ?? (PHOTOS.has(n) ? n : null)
      return { no: n, name, price: parsePrice(price), note: note || '', confirm: confirm || '', photo }
    })
}

export const menu = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    blurb: 'Served 6 am to 12 pm.',
    groups: [
      {
        items: parse(`
          34 | English Breakfast | 25
          35 | Mushroom & Cheese Omelette | 14
          36 | Scrambled Egg | 14
          37 | Idly Vada Set | 8
          38 | Puri Bhaji | 8
          39 | Chicken Curry + Poratta | 14
          40 | Masala Dosa | 7
          1 | Ghee Roast | 7
          2 | Dosa Set | 6
          3 | Idly Set | 7
          4 | Vada Set | 8
          5 | Egg Dosa | 7
          6 | Plain Roast | 7
          7 | Onion Dosa | 7
          8 | Kadala Curry + Poratta | 8
          9 | Egg Roast + Poratta | 8
          10 | Egg Curry + Poratta | 8
          11 | Dal Fry + 2 Poratta | 8
          12 | Egg Bhurji + Bread | 8
          13 | Egg Omelette + Bread | 8
          14 | Keema + 2 Poratta | 8
          15 | Parotta | 1.50
          16 | Chapati | 1.50
          17 | Onion Uttapam | 9
          18 | Egg Half Fry with Boiled Egg | 8
          19 | Avocado with Boiled Egg | 15
          20 | Avocado Toast with Horlicks | 18
        `),
      },
    ],
  },
  {
    id: 'tea-coffee',
    title: 'Tea & Coffee',
    blurb: 'Where several prices are listed, the card doesn’t name the cup sizes — ask when you order.',
    groups: [
      {
        items: parse(`
          21 | Karak Tea | 1.50/4/6
          22 | Samovar Tea | 2/5/7
          23 | Lemon Tea | 2/5/6
          24 | Fresh Milk Coffee | 5/7/9
          25 | Coffee | 4/6/8
          26 | Black Tea | 1.50/3/5
          27 | Horlicks | 4/7/10
          28 | Boost | 4/7/10
          29 | Ginger Masala Tea | 6
          30 | Ginger Tea | 2/4/6
          31 | Ginger Mint with Honey Tea | 3/5/7
          32 | Black Coffee | 3/5/7
          33 | Cold Coffee | 15
        `),
      },
    ],
  },
  {
    id: 'biryani',
    title: 'Biryani & Pulao',
    groups: [
      {
        title: 'House biryanis',
        items: parse(`
          64 | Charcoal Biryani | Quarter 23, Half 30, Full 58
          63 | Pothi Biryani | Chicken 18, Beef 20, Mutton 22
          66 | Thalassery Dum Biryani | Chicken 17, Beef 20, Fish 22, Mutton 22
          67 | Mix Grill Biryani | 39
          68 | Tandoori Chicken Biryani | 22
          69 | Chicken Hyderabadi Dum Biryani | 16
          70 | Chicken Mugalgal | 18/22
          65 | Sherry Biryani | ASP
        `),
      },
      {
        title: 'Biryani',
        items: parse(`
          41 | Chicken Fry Biryani | 17
          42 | Camel Biryani | 20
          43 | Mutton Biryani | 22
          44 | Beef Biryani | 20
          45 | King Fish Biryani | 20
          46 | Prawns Biryani | 24
          47 | Egg Biryani | 15
          48 | Vegetable Biryani | 14
          49 | Mushroom Biryani | 17
          50 | Special Tikka Meal | Chicken / Mutton 24
          51 | Special Kabab Meal | Chicken / Mutton 24
          52 | Tikka Biryani | 22
          53 | Karachi Biryani (Boneless) | 22
          54 | Paneer Biryani | 18
          55 | Strips Biryani | 20
        `),
      },
      {
        title: 'Pulao',
        items: parse(`
          56 | Paneer Pulao | 18
          57 | Green Peas Pulao | 16
          58 | Chicken Pulao | 20
          59 | Mutton Pulao | 24
          60 | Chana Pulao | 16
          61 | Vegetable Pulao | 15
          62 | Beef Pulao | 22
        `),
      },
    ],
  },
  {
    id: 'indian',
    title: 'Indian',
    groups: [
      {
        title: 'Signature curries',
        items: parse(`
          98 | Butter Chicken Masala | 20
          102 | Mutton Hyderabadi | 22
          71 | Chicken Korma | 18
          72 | Mutton Kadai | 22
          73 | Beef Masala | 18
          74 | Beef Roast | 20
          99 | Camel Roast | 22
          100 | Camel Masala | 22
          101 | Camel Pepper Fry | 22
        `),
      },
      {
        title: 'Mutton',
        items: parse(`
          75 | Mutton Masala | 20
          76 | Mutton Rogan Josh | 22
          77 | Mutton Mughlai | 20
          78 | Mutton Curry | 20
          79 | Mutton Palak | 20
          80 | Dal Gosht | 20
        `),
      },
      {
        title: 'Beef',
        items: parse(`
          81 | Beef Curry | 18
          82 | Beef Korma | 20
          83 | Beef Kolhapuri | 20
        `),
      },
      {
        title: 'Chicken',
        items: parse(`
          84 | Chicken Kadai | 16
          85 | Chicken Tikka Masala | 18
          86 | Chicken Rogan Josh | 18
          87 | Chicken Palak | 17
          88 | Chicken Chukka | 18
          89 | Chicken Masala | 16
          90 | Chicken Curry | 15
          91 | Chicken Do Pyaza | 16
          92 | Chicken Mughlai | 16
          93 | Chicken Punjabi | 16
          94 | Chicken Hyderabadi | 18
          95 | Chicken Kolhapuri | 17
          96 | Chicken Roast | 18
          97 | Chicken Handi | 18
        `),
      },
      {
        title: 'Vegetarian',
        items: parse(`
          170 | Paneer Palak | 16
          171 | Paneer Kadai | 16
          172 | Mushroom Masala | 16
          173 | Vegetable Korma | 16
          174 | Mix Vegetable | 15
          175 | Bhindi Fry | 15
          143 | Paneer Tikka Masala | 18
          144 | Matar Paneer | 16
          145 | Dal Tadka | 10
          146 | Kashmiri Dum Aloo | 15
          147 | Dal Makhani | 16
          148 | Dal Lasooni | 14
          149 | Dal Rice | 16
          150 | Green Peas Masala | 14
          151 | Aloo Jeera | 14
          152 | Aloo Methi | 14
          153 | Aloo Gobi Matar | 16
          154 | Bhindi Masala | 15
          155 | Paneer Bhurji | 18
          156 | Vegetable Kadai | 16
          157 | Vegetable Jaipuri | 15
          158 | Vegetable Kolhapuri | 15
          159 | Dal Khichdi | 16
          160 | Paneer Butter Masala | 18
          161 | Paneer Kolhapuri | 17
          162 | Aloo Palak | 12
          163 | Aloo Mutter | 14
          164 | Dal Palak | 12
          165 | Dal Fry | 9
          166 | Dal Palak Khichdi | 16
          167 | Chana Masala | 9
          168 | Gobi Masala | 14
          169 | Karela Fry | 15
        `),
      },
      {
        title: 'Rotti & breads',
        items: parse(`
          133 | Aloo Poratta | 8
          134 | Tandoori Roti | 2
          124 | Naan | 2
          125 | Butter Naan | 3
          126 | Butter Roti | 3
          127 | Pudina Poratta | 4
          128 | Tandoori Poratta | 3
          129 | Masala Kulcha | 8
          130 | Garlic Naan | 4
          131 | Paneer Kulcha | 10
          132 | Cheese Naan | 8
        `),
      },
    ],
  },
  {
    id: 'nadan',
    title: 'Nadan (Kerala)',
    groups: [
      {
        title: 'Nadan specials',
        items: parse(`
          136 | Kizhi Parotta | Chicken 20, Beef 22
          137 | Kothu Parotta | Veg 15, Egg 15, Chicken 16, Beef 18
          138 | Chicken Nadan Fry | 20
          139 | Beef Coconut Fry | 20
          140 | Beef Chilly Malabar Dry | 24
          141 | Chemmeen Varattiyathu | 22
          135 | Fish Chatti Curry | 18
          142 | Tandoori Chicken | 18/32
        `),
      },
      {
        title: 'Chicken',
        items: parse(`
          103 | Chicken Mulakittathu | 15
          104 | Chicken Chatti Curry | 16
          105 | Chicken Malabari | 16
          106 | Chilly Chicken (Nadan) | 18
          107 | Pepper Chicken Masala | 18
          108 | Pepper Dry Fry | 18
          109 | Chicken Fry (1 pc) | 10
        `),
      },
      {
        title: 'Seafood',
        items: parse(`
          110 | Fish Mango Curry | 20
          111 | Fish Shappu Curry | 22
          112 | Squid Roast | 18
          113 | Chemmeen Masala Fried | 22
          114 | King Fish / Sherry Fry | ASP
        `),
      },
      {
        title: 'Mutton',
        items: parse(`
          115 | Mutton Pepper Fry | 22
          116 | Mutton Korma | 22
          117 | Mutton Varattiyathu | 24
          118 | Mutton Chatti Curry | 23
        `),
      },
      {
        title: 'Egg',
        items: parse(`
          119 | Egg Boiled Masala | 12
          120 | Egg Korma | 12
          121 | Egg Roast | 12
          122 | Dal Anda Tadka | 12
          123 | Egg Bhurji | 10
        `),
      },
    ],
  },
  {
    id: 'soups-salads',
    title: 'Soups & Salads',
    groups: [
      {
        title: 'Soups',
        items: parse(`
          176 | Hot n Sour Soup | Veg 16, Chicken 18
          177 | Mushroom Soup | Veg 15, Chicken 16
          178 | Sweet Corn Soup | Veg 16, Chicken 18
          179 | Seafood Soup | 20
          180 | Vegetable Soup | 15
          181 | Mutton Soup | 18
          182 | Manchow Soup | Veg 16, Chicken 18
          183 | Tomato Soup | 15
          184 | Cream of Veg / Chicken | Veg 16, Chicken 18
          185 | Clear Soup | Veg 15, Chicken 17
          186 | Dal Soup | 14
          187 | Noodles Soup | Veg 15, Chicken 16
          188 | Lemon Coriander Noodles | 16/18
          189 | Cream of Mushroom Soup | 16/18
        `),
      },
      {
        title: 'Salads',
        items: parse(`
          198 | Zinker Salad | 18
          199 | Fattoush | 16
          200 | Avocado Salad | 22
          201 | Hummus | 7/14
          190 | Olive Salad | 18
          191 | Cucumber with Yoghurt | 14
          192 | Grilled Chicken Salad | 20
          193 | Green Salad | 15
          194 | Tuna Salad | 20
          195 | Arabic Salad | 15
          196 | Tomato Salad | 14
          197 | Prawns Salad | 25
        `),
      },
    ],
  },
  {
    id: 'chinese',
    title: 'Chinese',
    groups: [
      {
        title: 'Fried rice & noodles',
        items: parse(`
          203 | Fried Rice | Veg 15, Egg 16, Beef 19, Prawns 25, Chicken 18, Mixed 28
          202 | Schezwan Noodles | Veg 16, Egg 18, Chicken 20, Beef 21, Prawns 25, Mixed 28
          206 | Schezwan Fried Rice | Veg 16, Egg 18, Chicken 20, Beef 21, Prawns 25, Mixed 28
          207 | Noodles | Veg 15, Egg 16, Beef 19, Prawns 25, Chicken 18, Mixed 28
          208 | Hakka Noodles | Veg 16, Egg 18, Beef 22, Prawns 26, Chicken 20, Mixed 28
          204 | Chicken Fry with Fried Rice | 22
          205 | Fish Fry with Fried Rice | 26
        `),
      },
      {
        title: 'Chinese combos',
        items: parse(`
          214 | Prawns Fried Rice + Prawns Chilly Sauce | 32
          209 | Chicken Fried Rice + Chicken Manchurian | 24
          210 | Chicken Noodles + Chilly Chicken Dry | 24
          211 | Beef Fried Rice + Beef Manchurian | 24
          212 | Veg Fried Rice + Gobi 65 | 23
          213 | Chicken Schezwan Fried Rice + Chicken Schezwan Gravy | 26
        `),
      },
      {
        title: 'Chinese specials',
        items: parse(`
          247 | Chicken Lollipop (8 pcs) | 24
          248 | Chicken Chilli (Dry / Gravy) | 18
          249 | Chicken Manchurian | 18
          250 | Honey Chilli Wings | 22
          251 | Sweet n Sour Prawns | 25
          252 | Gobi Manchurian (Dry / Sauce) | 19
          253 | Chilli Beef | 20
          254 | Chicken 65 | 20
          255 | Mushroom Chilli (Dry / Sauce) | 18
          256 | Prawns Chilli (Dry / Sauce) | 25
        `),
      },
      {
        title: 'Starters',
        items: parse(`
          215 | Piri Piri Prawns | 25
          216 | Salt & Pepper Prawns | 22
          217 | Paneer Chilly Dry | 20
          218 | Potato Chilly Dry | 18
          219 | Gobi 65 | 18
          220 | Honey Chilli Corn Potato | 22
          221 | Fry Calamari | 22
          222 | Honey Chilly Wings | 22
        `),
      },
      {
        title: 'Chicken',
        items: parse(`
          223 | Chicken Pepper | 18
          224 | Chicken Cashew Nut | 22
          225 | Ginger Chicken (Dry / Gravy) | 20
          226 | Sweet n Sour Chicken | 20
          227 | Shredded Crispy Chilli Chicken | 20
          228 | Chicken in Black Pepper Sauce | 20
          229 | Thai Chicken Curry Red | 22
          230 | Thai Chicken Curry Green | 22
          231 | Thai Prawns Red / Green | 25
          232 | Chilli Wings | 20
        `),
      },
      {
        title: 'Beef',
        items: parse(`
          233 | Beef Manchurian | 19
          234 | Beef Pepper | 19
          235 | Schezwan Beef (Dry / Gravy) | 22
          236 | Beef in Black Pepper Sauce | 19
        `),
      },
      {
        title: 'Vegetable',
        items: parse(`
          237 | Crispy Vegetable | 17
          238 | Thai Veg Curry Red | 20
          239 | Thai Veg Curry Green | 20
          240 | Vegetable Manchurian | 19
        `),
      },
      {
        title: 'Seafood',
        items: parse(`
          241 | Prawns Manchurian | 25
          242 | Fish Manchurian | 20
          243 | Sweet n Sour Fish | 20
          244 | Sweet n Sour Squid | 24
          245 | Squid Manchurian | 24
          246 | Squid Chilli Gravy / Sauce | 24
        `),
      },
    ],
  },
  {
    id: 'filipino',
    title: 'Filipino',
    groups: [
      {
        title: 'Favourites',
        items: parse(`
          290 | Beef Bulalo with Rice | 32
          291 | Tapsilog | 23
          292 | Hotsilog | 20
          288 | Fried Calamari | 26
          289 | Daing na Bangus | 26
          286 | Pancit Canton | 21
          287 | Kabayan Chopsuey | 25
        `),
      },
      {
        title: 'Noodles',
        items: parse(`
          257 | Pancit Bihon | 21
          258 | Pancit Fiesta | 21
        `),
      },
      {
        title: 'Beef',
        items: parse(`
          259 | Bopis with Rice | 26
          260 | Adobo Karne with Rice | 25
          261 | Bee Tapa with Rice | 24
          262 | Ampalaya con Carne with Rice | 24
          263 | Papitan with Rice | 25
          264 | Nilagang Baka with Rice | 30
          265 | Calderete (Kambing / Rice) | 25
          266 | Kare Kare | 32 | Coxtrife with meat, with rice
        `),
      },
      {
        title: 'Chicken',
        items: parse(`
          267 | Chicken Adobo with Rice | 22
          268 | Tinolang Manok with Rice | 24
          269 | Fried Chicken Whole with Rice | 36
          270 | Tortang Talong with Rice | 19
        `),
      },
      {
        title: 'Seafood',
        items: parse(`
          271 | Sinigang na Bangus with Rice | 26
          272 | Fried Tilapia with Rice | 24
          273 | Pinakbet with Rice | 26
          274 | Adobong Pucit with Rice | 24
          275 | Sinigang na Hipon with Rice | 29
          276 | Ginatanga na Hipon with Rice | 29
          277 | Ampalaya con Hipon with Rice | 30
          278 | Sarciadong Tilapia with Rice | 28
        `),
      },
      {
        title: 'Sizzling, silog & soup',
        items: parse(`
          279 | Chicken Sizzling with Rice | 28
          280 | Beef Sizzling with Rice | 30
          281 | Chicken Silog | 22
          282 | Bang Silog | 22
          283 | Lomi (Mixed Meat & Shrimps) | 26
          284 | Soaps Sapathon | 24
          285 | Mami Noodles | Chicken / Beef 26
        `),
      },
    ],
  },
  {
    id: 'pasta-rice',
    title: 'Pasta & Rice',
    groups: [
      {
        title: 'Pasta',
        items: parse(`
          293 | Penne Siciliana | 25
          294 | Marinara | 30
          295 | Carbonara | 30
          296 | Penne Arrabiata | 26
          297 | Spaghetti Bolognese | 28
          298 | Pesto Pasta | 28
          299 | Alfredo Pasta | 30
          300 | Milanese | 30
        `),
      },
      {
        title: 'Rice meals with cola',
        items: parse(`
          309 | Jeera Rice with Mix Veg Curry + Cola | 22
          310 | Ghee Rice + Beef Curry + Cola | 25
          311 | Rice with Fish Curry + Cola | 24
          312 | Rice with Butter Chicken + Cola | 27
          313 | Rice with Chicken Curry + Cola | 23
          314 | Rice with Thai Chicken Curry (Green / Red) + Cola | 28
        `),
      },
      {
        title: 'Rice',
        items: parse(`
          308 | Curd Rice | 13
          301 | Jeera Rice | 13
          302 | Tomato Rice | 13
          303 | Garlic Rice | 13
          304 | Lemon Rice | 13
          305 | Jasmine Rice | 8
          306 | Ghee Rice | 13
          307 | White Rice | 7
        `),
      },
    ],
  },
  {
    id: 'grill',
    title: 'Grilled Corner',
    blurb: 'All grills are served with bread, hummus and salad.',
    groups: [
      {
        title: 'Charcoal chicken',
        items: parse(`
          321 | Pepper Chicken Charcoal | Half 28, Full 52
          322 | Peri Peri Chicken Charcoal | Half 29, Full 52
          323 | Green Chilli Chicken Charcoal | Half 28, Full 52
          324 | Normal Chicken Charcoal | Half 27, Full 48
        `),
      },
      {
        title: 'Platters & kababs',
        items: parse(`
          325 | Mixed Grill | 49/69/115
          326 | Paneer Tikka | 28
          327 | Mutton Tikka | 32
          328 | Kash Kash Kabab | 32
          329 | Tikka Yogurt | Chicken 30, Mutton 32
          330 | Chicken Tikka | 29
          331 | Kabab | Chicken 30, Mutton 32
          332 | Lamb Chops (4 pcs) | 45
          333 | Mix Kabab | 32
          334 | Arayes | Chicken 28, Mutton 30
          335 | Chicken Wings (12 pcs) | 29
        `),
      },
      {
        title: 'Seafood grills',
        items: parse(`
          315 | Seafood Mix Grill | 62
          316 | Grilled Prawns | 50
          317 | Grilled Hamour | 45
          318 | Grilled Sherry | ASP
          319 | Grilled Seabream | ASP
          320 | Tilapia Grilled | ASP
        `),
      },
    ],
  },
  {
    id: 'fried-chicken',
    title: 'Fried Chicken',
    groups: [
      {
        items: parse(`
          338 | Family Meal | 68 | 12 pcs chicken, 6 buns, fries, garlic, coleslaw, large cola
          339 | Party Meal | 90 | 18 pcs chicken, 10 buns, fries, garlic, coleslaw, large cola
          336 | Seven Stone Special | 32 | Zinker burger, 2 pcs chicken, fries, cola
          337 | Snack Meal | 17 | 2 pcs chicken, bun, fries, garlic, cola
          340 | Dinner Meal | 22 | 3 pcs chicken, bun, fries, garlic, cola, coleslaw
          341 | Strips Meal | 22 | 3 pcs chicken strips, bun, fries, garlic, cola, coleslaw
          342 | Jumbo Meal | 40 | 6 pcs chicken, bun, fries, garlic, coleslaw, 2 cola
        `),
      },
    ],
  },
  {
    id: 'wraps',
    title: 'Shawarma, Rolls & Wraps',
    groups: [
      {
        title: 'Shawarma plates',
        items: parse(`
          348 | Arabic Shawarma | 18
          349 | Avocado with Chicken Wrap | 22
          350 | Chicken Fillet | 16
          351 | Sheesh Tawook | 16
        `),
      },
      {
        title: 'Grilled rolls',
        items: parse(`
          343 | Chicken Tikka Roll | 18
          344 | Mutton Tikka Roll | 20
          345 | Paneer Tikka Roll | 18
          346 | Mutton Kabab Roll | 20
          347 | Chicken Kabab Roll | 18
        `),
      },
      {
        title: 'Wraps',
        items: parse(`
          352 | Egg Wrap | 13
          353 | Chicken Fillet Wrap | 14
          354 | Mathafi Wrap | 17
          355 | Zinker Wrap | 15
          356 | Falafel Wrap | 14
          357 | Hotdog Wrap | 13
        `),
      },
      {
        title: 'Poratta & sandwiches',
        items: parse(`
          370 | Zinger Poratta | 15
          373 | Tikka Poratta | 15
          371 | Nutella Poratta | 6
          372 | Chicken Poratta | 8
          374 | Francisco Poratta | 10
          375 | Veg Poratta | 6
          358 | Chicken Nashif Poratta | 7
          359 | Hotdog Poratta | 6
          360 | Shawarma Sandwich | 8
          361 | Omelette Poratta | 5
          362 | Tuna Sandwich | 7
          363 | Egg Boiled Sandwich | 5
          364 | Maska Slice Sandwich | 6
          365 | Falafel Sandwich | 7
          366 | Hassan Mathar | 9
          367 | Burger Poratta | 12
          368 | Beef Poratta | 10
          369 | Cheese Poratta | 5
        `),
      },
    ],
  },
  {
    id: 'burgers',
    title: 'Burgers & Sandwiches',
    groups: [
      {
        title: 'Fresh burgers',
        items: parse(`
          376 | Angus Burger | 22
          377 | Grill Double Burger | Chicken 32, Beef 34
          378 | Classic Beef Grill Burger | 26
          379 | BBQ Chicken Burger | 24
          380 | Camel Fresh Grill Burger | 28
          381 | Cheetos Beef Grill Burger | 22
          382 | Avocado Burger | 24 | Chicken, beef or fish
          383 | BBQ Oman Chips Burger | 22 | Chicken or beef
          384 | Fried Chicken Cheetos Burger | 22
          385 | Spicy Fried Burger | 20
          386 | Grill Fresh Chicken Combo | 24
          387 | Grill Fresh Beef Combo | 25
        `),
      },
      {
        title: 'Burger sandwiches',
        items: parse(`
          388 | Mega Zinker Burger | 18
          389 | Mighty Zinker Burger + Cola | 22
          390 | Double Burger | Chicken 18, Beef 20
          391 | Tikka Burger | 13
          392 | Zinker Burger | 15
          393 | Burger Chicken / Mutton | 9
          394 | Beef Burger | 9
          395 | Fish Fillet Burger | 15
          396 | Jumbo Prawns Burger | 14
          397 | Chicken Fillet Burger | 14
          398 | Vegetable Burger | 8
        `),
      },
      {
        title: 'Combo sandwiches',
        items: parse(`
          399 | Mathafi Combo | 18
          400 | Zinker Combo | 15
          401 | Avocado Prawns Combo | 24
          402 | Hamour Fillet Combo | 15
          403 | Kabab Combo | 14
          404 | Grilled Tikka Combo | 16
          405 | Chicken Fillet Combo | 15
          406 | Jumbo Prawns Combo | 15
          407 | Chicken Nuggets Combo | 15
          408 | Hotdog Combo | 13
          409 | Butterfly Prawns Combo | 16
        `),
      },
      {
        title: 'Club sandwiches',
        items: parse(`
          422 | International | 52
          423 | Seven Stone Special | 35
          410 | Zinker Club | 18
          411 | Brown Club | 16
          412 | Avocado Club | 18
          413 | Egg Club | 14
          414 | Vegetable Club | 15
          415 | Mix Club | 18
          416 | Hotdog Club | 15
          417 | Seafood Club | 18
          418 | Beef Club | 16
          419 | Chicken Club | 16
          420 | Tuna Club | 16
          421 | Mega Club | 18
        `),
      },
    ],
  },
  {
    id: 'snacks',
    title: 'Snacks & Plates',
    groups: [
      {
        items: parse(`
          424 | Dynamite Chicken | 22
          426 | Dynamite Shrimps | 25
          425 | Cheese Fries with Beef | 26
          427 | Cheese Fries with Chicken | 24
          428 | Nuggets Plate (7 pcs) | 19
          429 | Falafel Plate (7 pcs) | 14
          430 | Butterfly Prawns (8 pcs) | 24
          431 | Fillet Plate (4 pcs) | 20
          432 | Cheese Cheetos Fries | 21
          433 | Cheese Fries | 19
          434 | Samosa Plate (8 pcs) | 16
          435 | Jumbo Prawns (7 pcs) | 20
          436 | Fish Zinger | 22
          437 | Fish n Chips | 28
          438 | Spring Roll, Chicken / Veg (7 pcs) | 15
          439 | Hotdog Plate | 16
          440 | Hummus with Meat | 23
          441 | Mozzarella Stick (6 pcs) | 18
          442 | Potato Wedges | 13
          443 | French Fries | 8/14/22
          444 | Onion Rings | 14
          445 | Potato Rings | 14
          446 | Popcorn Chicken | 18
        `),
      },
    ],
  },
  {
    id: 'juices',
    title: 'Juices',
    blurb: 'Where two prices are listed, the card doesn’t name the glass sizes — ask when you order.',
    groups: [
      {
        title: 'Fresh juices',
        items: parse(`
          447 | Carrot | 13/15
          448 | Orange | 13/15
          449 | Pomegranate | 13/15
          450 | Papaya | 13/15
          451 | Apple | 13/15
          452 | Strawberry | 13/15
          453 | Pineapple | 13/15
          454 | Banana | 10/12
          455 | Watermelon | 13/15
          456 | Lemon Mint | 13/15
          457 | Lemon | 13/15
          458 | Chickoo | 13/15
          459 | Grape | 13/15
        `),
      },
      {
        title: 'Special juices',
        items: parse(`
          463 | Mango | 14/16
          464 | Passion Fruit | 19
          465 | Avocado | 14/16
          460 | Cocktail | 16
          461 | Kiwi | 13/15
          462 | Coconut | Water 12, Juice 14
          466 | Guava | 13/15
          467 | Beetroot | 15
          468 | Sweetmelon | 13/15
          485 | Bottle Juice (1) | 38
        `),
      },
      {
        title: 'Healthy juices',
        items: parse(`
          521 | ABC | 19 | Apple, beetroot, carrot
          516 | Life | 19 | Apple, lime
          517 | Body Builder | 19 | Banana, chickoo, avocado, milk & nuts
          518 | Miracle | 19 | Strawberry, orange, apple
          519 | Anti Oxident | 19 | Mango, pear, carrot, apple
          520 | Power Booster | 19 | Carrot, apple, orange, ginger
          522 | Hangover Cure | 19 | Pineapple, mango, banana, orange
          523 | Summer Cool | 19 | Orange, lemon, sweetmelon
          524 | Red Cure | 19 | Beetroot, apple, lemon
          525 | By Five | 19 | Mango, strawberry, carrot, pineapple, kiwi
          526 | Juice Salvation | 19 | Pineapple, apple, ginger
          539 | Kale Vita Load Juice | 20
          540 | Kale Speed Juice | 20
          541 | Kale Power Booster Shake | 20
          542 | Kiwi with Lemon | 18
        `),
      },
      {
        title: 'Passion & lassi',
        items: parse(
          `
          533 | Apple Passion | 19
          534 | Orange Passion | 19
          535 | Avocado Passion | 19
          536 | Mango Passion | 19
          537 | Banana Passion | 19
          538 | Pineapple Passion | 19
          527 | Plain Lassi | 12
          528 | Salt Lassi | 12
          529 | Sweet Lassi | 12
          530 | Mango Lassi | 14
          531 | Strawberry Lassi | 14
          532 | Fruit Lassi | 14
        `,
          { photoFor: (n) => (n >= 533 && n <= 538 ? 533 : n >= 527 && n <= 532 ? 527 : null) },
        ),
      },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts & Shakes',
    groups: [
      {
        title: 'Falooda, sundaes & ice cream',
        items: parse(`
          475 | Falooda | 17
          476 | Avocado Falooda | 17
          477 | Strawberry Falooda | 17
          478 | Mango Falooda | 17
          479 | Chocolate Falooda | 17
          480 | Fruit Salad | 16
          481 | Glory | 18
          482 | Chocolate Sundae | 17
          483 | Strawberry Sundae | 17
          484 | Mixed Ice Cream | 15
          504 | Classic Banana Split | 20
        `),
      },
      {
        title: 'Shakes',
        items: parse(
          `
          469 | Galaxy Fruit | 17
          470 | Nuts Shake | 17
          471 | Dates Shake | 17
          472 | Abood | 17
          473 | Choco Boost | 17
          474 | Thabakath | 18
          493 | Lotus Shake | 17
          494 | Snickers / Galaxy Shake | 17
          495 | Chocolate Shake | 17
          496 | Oreo Shake | 17
          497 | Nutella Shake | 17
          498 | Cappuccino Mocca | 17
          499 | Horlicks Cool | 17
          486 | Milk Shake | 15 | Vanilla, pista, strawberry or chocolate (numbers 486 to 489 on the card)
          490 | Falak | 20
          491 | Burj Khalifa | 20
          492 | 50 x 50 | 20
        `,
          { photoFor: (n) => (n >= 487 && n <= 489 ? 486 : null) },
        ),
      },
      {
        title: 'Fruit bricks & plates',
        items: parse(`
          500 | Pineapple Bricks | 17
          501 | Mango Bricks | 17
          502 | Mix Bricks | 17
          503 | Pomegranate Seeds | 17
          507 | Watermelon Plate | 17
          508 | Mix Fruit Plate | 33
        `),
      },
    ],
  },
  {
    id: 'mojitos',
    title: 'Mojitos & Sodas',
    groups: [
      {
        items: parse(`
          509 | Hibiscus Ice | 15
          510 | Apple Mojito | 15
          511 | Berry Mojito | 15
          512 | Blue Mojito | 15
          513 | Strawberry Mojito | 15
          514 | Passion Fruit Mojito | 15
          515 | Seven Stone Lemon Mint | 13
          505 | Lemon Soda | 12
          506 | Ginger Soda | 12
        `),
      },
    ],
  },
]

export const allItems = menu.flatMap((cat) =>
  cat.groups.flatMap((g) => g.items.map((it) => ({ ...it, categoryId: cat.id, categoryTitle: cat.title }))),
)

export function formatPrice(p) {
  return Number.isInteger(p) ? String(p) : p.toFixed(2)
}
