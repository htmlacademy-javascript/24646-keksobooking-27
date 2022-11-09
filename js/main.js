const NUMBER_OF_GENERATED_OBJECTS = 10;
const TITLES = [
  'titleA',
  'titleB',
  'titleC',
  'titleD',
  'titleE',
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKINOUT = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTION = [
  'descriptionA',
  'descriptionB',
  'descriptionC',
  'descriptionD',
  'descriptionE',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const DECIMAL_POINT = 5;
const ROOMS_MIN = 0;
const ROOMS_MAX = 5;
const GUESTS_MIN = 0;
const GUESTS_MAX = 10;
const PRICE_MIN = 0;
const PRICE_MAX = 1000;
const IMG_MIN = 0;
const IMG_MAX = 10;

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveInteger (a, b) {
  // Если переданы отрицительные числа, возвращаем NaN
  if (a < 0 || b < 0) {
    return NaN;
  }

  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max.

  // После нам нужно убедиться, что пользователь не передал дробные значения,
  // для этого на всякий пожарный случай нижнюю границу диапазона
  // мы округляем к ближайшему большему целому с помощью Math.ceil,
  // а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower + 1) + lower;
  // "Плюс единица", чтобы включить верхнюю границу диапазона в случайные числа

  // И в конце с помощью метода Math.floor мы округляем полученный результат,
  // потому что Math.random() генерирует только дробные числа и ноль.
  return Math.floor(result);
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveFloat (a, b, digits = 1) {
  // Если переданы отрицительные числа, возвращаем NaN
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }

  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower) + lower;

  // И в конце с помощью метода toFixed любого числа в JavaScript
  // указать требуемое количество знаков после точки.
  // Метод возвращает строку, поэтому с помощью унарного плюса превращаем её в число
  return +result.toFixed(digits);
}
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

function getArray(features) {
  const maxLength = features.length;
  const lengthOfArray = getRandomPositiveInteger(1, maxLength);
  const array = [];

  while (array.length < lengthOfArray) {
    const indexOfEl = getRandomPositiveInteger(0, maxLength - 1);
    const el = features[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }
  return array;
}

//create an object - describes the author
const createAuthor = () => ({
  avatar: `img/avatars/user${getRandomPositiveInteger(IMG_MIN,IMG_MAX).toString().padStart(2, '0')}.png`,
});
//create an object - describes the offer
const createOffer = () => ({
  title: `${getRandomArrayElement(TITLES)}`,
  address: `${getRandomPositiveFloat(LAT_MIN, LAT_MAX, DECIMAL_POINT), getRandomPositiveFloat(LNG_MIN, LNG_MAX, DECIMAL_POINT)}`,
  price: `${getRandomPositiveInteger(PRICE_MIN, PRICE_MAX)}`,
  type: `${getRandomArrayElement(TYPES)}`,
  rooms: `${getRandomPositiveInteger(ROOMS_MIN, ROOMS_MAX)}`,
  guests: `${getRandomPositiveInteger(GUESTS_MIN, GUESTS_MAX)}`,
  checkin: `${getRandomArrayElement(CHECKINOUT)}`,
  checkout: `${getRandomArrayElement(CHECKINOUT)}`,
  features: `${FEATURES.slice(0, getRandomPositiveInteger(0, FEATURES.length))}`,
  description: `${getRandomArrayElement(DESCRIPTION)}`,
  photos: `${getArray(PHOTOS)}`,
});
//create an object - describes the location
const createLocation = () => ({
  lat: `${getRandomPositiveFloat(LAT_MIN, LAT_MAX, DECIMAL_POINT)}`,
  lng: `${getRandomPositiveFloat(LNG_MIN, LNG_MAX, DECIMAL_POINT)}`,
});
//create an object - describes author, offer, location
const createAd = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation()
});
//create array with a given amount of objects
const GENERATED_OBJECTS = Array.from({length: NUMBER_OF_GENERATED_OBJECTS}, createAd);

GENERATED_OBJECTS();
