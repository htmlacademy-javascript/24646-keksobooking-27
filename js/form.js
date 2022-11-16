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

const getRoomsErrorMessage = () => roomErrors[roomNumberField.value];

const validateRooms = () => roomsOption[roomNumberField.value].includes(capacityField.value);

pristine.addValidator(roomNumberField, validateRooms, getRoomsErrorMessage);
pristine.addValidator(capacityField, validateRooms);

roomNumberField.addEventListener('change', () => pristine.validate(capacityField));
capacityField.addEventListener('change', () => pristine.validate(roomNumberField));
