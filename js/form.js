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

export {inactiveState, activeState};
