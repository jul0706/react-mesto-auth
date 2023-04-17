export const formValidationConfig = { //объект настроек валидации
    formSelector: '.form-popup',
    inputSelector: '.form-popup__input',
    submitButtonSelector: '.form-popup__button-save',
    inactiveButtonClass: 'form-popup__button-save_disabled',
    inputErrorClass: 'form-popup__input_type_error',
    errorClass: 'form-popup__error_visible',
};

//Объявляем переменные 
export const buttonOpenPopupProfile = document.querySelector('.profile__edit-button'); 
export const formProfileElement = document.querySelector('.form-popup_type_profile'); 
export const buttonOpenPopupAddCard = document.querySelector('.add-button');
export const inputName = formProfileElement.querySelector('.form-popup__input_type_name');
export const inputJob = formProfileElement.querySelector('.form-popup__input_type_job');
export const placesElement = document.querySelector('.places');
export const buttonOpenChangeAvatarPopup = document.querySelector('.profile__avatar-button');
