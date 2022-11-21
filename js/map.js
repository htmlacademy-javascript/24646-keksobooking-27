import {activeState, inactiveState} from './form.js';
import {GENERATED_OFFERS} from './data.js';
import {showCard} from './card.js';

inactiveState();

const tokioCoordinates = {
  lat: 35.6895,
  lng: 139.692,
};

const address = document.querySelector('#address');

const map = L.map('map')
  .on('load', () => {
    activeState();
    address.value = `${tokioCoordinates.lat.toFixed(5)}, ${tokioCoordinates.lng.toFixed(5)}`;
  })
  .setView(tokioCoordinates, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAncor: [26, 52],
});

const mainMarker = L.marker(
  tokioCoordinates,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const location = evt.target.getLatLng();
  address.value = `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAncor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const offersForMarker = GENERATED_OFFERS;

offersForMarker.forEach((offer) => {
  const {location:{lat, lng}} = offer;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(showCard(offer));
});
