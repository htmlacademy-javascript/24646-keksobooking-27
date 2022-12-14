const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const fieldSet = adForm.querySelectorAll('fieldset');
const mapSelect = mapFilters.querySelectorAll('select');

const inactiveState = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  fieldSet.forEach((formFieldItem) => {
    formFieldItem.setAttribute('disabled',true);
  });
  mapSelect.forEach((mapSelectItem) => {
    mapSelectItem.setAttribute('disabled',true);
  });
};

const activeState = () =>{
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  fieldSet.forEach((formFieldItem) => {
    formFieldItem.removeAttribute('disabled');
  });
  mapSelect.forEach((mapSelectItem) => {
    mapSelectItem.removeAttribute('disabled');
  });
};

const form = document.querySelector('.ad-form');
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help'
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});

export {inactiveState, activeState};

const roomNumberField = form.querySelector('#room_number');
const capacityField = form.querySelector('#capacity');

const roomErrors = {
  1: 'для 1 гостя',
  2: 'для 1-2 гостей',
  3: 'для 1-3 гостей',
  100: 'Не для гостей'
};

const roomsOption = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const minPrice = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel' : 3000,
  'house' : 5000,
  'palace' : 10000
};

const type = form.querySelector('#type');
const price = form.querySelector('#price');
type.addEventListener('change', () => {
  price.ariaPlaceholder = minPrice[type.value];
  price.min = minPrice[type.value];
});

function checkPrice () {
  return price.value >= Number(price.min);
}

function getPriceErrorMessage () {
  return `Минимальная цена за ночь ${price.min}`;
}

const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');

timein.addEventListener('change', () =>{timeout.value = timein.value;});
timeout.addEventListener('change', () => {timein.value = timeout.value;});

const getRoomsErrorMessage = () => roomErrors[roomNumberField.value];

const validateRooms = () => roomsOption[roomNumberField.value].includes(capacityField.value);

pristine.addValidator(roomNumberField, validateRooms, getRoomsErrorMessage);
pristine.addValidator(capacityField, validateRooms);
pristine.addValidator(price, checkPrice, getPriceErrorMessage);

roomNumberField.addEventListener('change', () => pristine.validate(capacityField));
capacityField.addEventListener('change', () => pristine.validate(roomNumberField));

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  connect: 'lower',
  step: 1,
  start: 0,
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  }
});

sliderElement.noUiSlider.on('update', () => {
  price.value = sliderElement.noUiSlider.get();
});

price.addEventListener('change', () => {
  sliderElement.noUiSlider.set(price.value);
});

type.addEventListener('change', () => {
  price.placeholder = minPrice[type.value];
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minPrice[type.value],
      max: 100000
    }
  });
});
