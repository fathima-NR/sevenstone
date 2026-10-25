/*
 * Business details — everything here is taken from the menu card unless it is
 * marked `confirm: true`. Before going live, check every confirm item with the
 * restaurant, then set SHOW_CONFIRM_MARKERS to false to hide the tags.
 */

export const SHOW_CONFIRM_MARKERS = false

export const business = {
  name: 'Seven Stones Restaurant',
  shortName: 'Seven Stones',
  // Printed on the logo: "ESTD 2016"
  established: 2016,
  cuisines: [
    'Arabic',
    'Chinese',
    'North Indian',
    'Nadan (Kerala)',
    'Filipino',
    'Juices',
    'Desserts',
    'Sandwiches',
    'Hot drinks',
  ],

  address: {
    lines: ['Art XII Building, near Grand Millennium Hotel', 'Barsha Heights (TECOM), Dubai, UAE'],
    // Map pin is found by searching the printed address — confirm the pin
    mapQuery: 'Art XII Building, Barsha Heights, Dubai',
    mapConfirm: true,
  },

  phones: [{ label: 'Call', display: '04 580 6060', tel: '+97145806060' }],
  whatsapp: [
    { display: '056 311 7762', number: '971563117762' },
    { display: '052 369 7870', number: '971523697870' },
  ],

  services: ['Free home delivery', 'Visa and Mastercard accepted'],

  hours: {
    // The card shows a "24 hours" badge but no written opening hours
    summary: 'Open 24 hours',
    confirm: true,
    breakfast: 'Breakfast 6 am to 12 pm',
  },

  // The menu card shows Instagram and Facebook icons with the name "Seven Stone",
  // but no handle or link, and none could be verified online. Paste the full
  // profile URLs here (e.g. 'https://www.instagram.com/yourhandle'). Empty ones
  // still show their icon but are not clickable. WhatsApp and Google Maps links
  // always work.
  social: {
    instagram: '',
    facebook: '',
    tiktok: '',
  },
  socialName: 'Seven Stone',
}

export const waLink = (number, text) => `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address.mapQuery)}`
export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(business.address.mapQuery)}&z=16&output=embed`
