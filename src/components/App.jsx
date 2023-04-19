import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import React, {useState} from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  {/*Создаем внутренние состояния для попапов*/}
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); 
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  //функции бработчики - изменяют переменную состояния открытия попапов
  function handleEditAvatarClick () { 
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardImageClick (card) {
    setSelectedCard(card);
  }

  function handleCloseAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  
  return (
    <>
        <Header />        
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardImageClick}
        />
        <Footer /> 
        {/*Попап: Форма редактирования профиля*/}
        <PopupWithForm  
            title='Редактировать профиль' 
            name='profile-popup'
            textSubmitButton='Сохранить'
            isOpen={isEditProfilePopupOpen}
            onClose={handleCloseAllPopups}>
                <fieldset className="form-popup__inputs">
                    <input 
                        type="text" 
                        id="name-input" 
                        name="name" 
                        className="form-popup__input form-popup__input_type_name" 
                        minLength="2" 
                        maxLength="40" 
                        placeholder="Ваше имя" 
                        required
                    />
                    <span className="name-input-error form-popup__error"></span>
                    <input 
                        type="text" 
                        id="job-input" 
                        name="about" 
                        className="form-popup__input form-popup__input_type_job" 
                        minLength="2" 
                        maxLength="200" 
                        placeholder="Ваш род деятельности"
                        required
                    />
                    <span className="job-input-error form-popup__error"></span>
                </fieldset>
        </PopupWithForm>
        {/*Попап: Форма добавления карточки*/}
        <PopupWithForm 
            title='Новое место' 
            name='add-button-popup'
            textSubmitButton='Создать'
            isOpen={isAddPlacePopupOpen}
            onClose={handleCloseAllPopups}>
                <fieldset className="form-popup__inputs">
                    <input 
                        type="text" 
                        id='place-input' 
                        name="name" 
                        className="form-popup__input form-popup__input_type_place" 
                        minLength="2" 
                        maxLength="30" 
                        placeholder="Название" 
                        required 
                    />
                    <span className="place-input-error form-popup__error"></span>
                    <input 
                        type="url" 
                        id="link-input" 
                        name="link" 
                        className="form-popup__input form-popup__input_type_link" 
                        placeholder="Ссылка на картинку" 
                        required 
                    />
                    <span className="link-input-error form-popup__error"></span>
                </fieldset>
        </PopupWithForm>        
        
        {/*Попап удаления карточки*/}
        <PopupWithForm 
            title='Вы уверены?' 
            name='delete-popup'
            textSubmitButton='Да'
            isOpen={false}
            onClose={handleCloseAllPopups}>
        </PopupWithForm>
        
        {/*Попап редактирования аватара*/}
        <PopupWithForm 
            title='Обновить аватар' 
            name='edit-avatar-popup'
            textSubmitButton='Сохранить'
            isOpen={isEditAvatarPopupOpen}
            onClose={handleCloseAllPopups}>
                <fieldset className="form-popup__inputs">
                    <input 
                        type="url" 
                        id='avatar-input' 
                        name="avatar" 
                        className="form-popup__input form-popup__input_type_avatar" 
                        placeholder="Ссылка на изображение" 
                        required 
                    />
                    <span className="avatar-input-error form-popup__error"></span>
                </fieldset>
        </PopupWithForm>
         
         {/*Попап просмотра изображения карточки*/}
        <ImagePopup 
            card = {selectedCard}
            onClose={handleCloseAllPopups}
        />
    </>
  );
}

export default App;
