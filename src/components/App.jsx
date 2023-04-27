import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import React, {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";
import EditProfilePopup from "./EditProfilePopup";

function App() {
  {/*стейты для попапов*/}
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); 
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  
  const [currentUser, setCurrentUser] = useState(''); //стейт текущего пользователя
  const [cards, setCards] = useState([]); //стейт карточек

  function displayError (err) { //показ ошибки от сервера
    alert(err)
  };

  useEffect(()=>{ //получили данные карточек
    api.getDataServer('cards')
    .then((res)=>{
        setCards(res) //сохранили в стейт cards
    })
    .catch(err => displayError(err));
  },[])
  
  useEffect(()=>{ //получили данные пользователя
    api.getDataServer('users/me')
    .then((res)=>{
      setCurrentUser(res); //сохранили в стэйт currentUser
    })
    .catch(err => displayError(err));
  },[])

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

  function handleCardLike(card) { //лайк/дизлайк карточки
    const isUserLiked = card.likes.some((userLiked)=>{ //лайкал ли пользователь карточку
      return userLiked._id === currentUser._id
    })
    api.likeCard(card._id, isUserLiked) //запрос на постановку/снятие лайка
      .then((newCard)=>{
        setCards((state)=> state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => displayError(err));
  }

  function handleCardDelete(id) { //лайк/дизлайк карточки
      api.deleteCard(id) //запрос на постановку/снятие лайка
      .then(()=>{
        setCards((state)=> state.filter((c) => c._id != id))
      })
      .catch(err => displayError(err));
  }

  function handleUpdateUser (userObject) {
    api.editUserInfo(userObject)
    .then((res) => {
      setCurrentUser(res)
    })
    .catch(err => displayError(err));
    handleCloseAllPopups();
  }

  
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <Header />        
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardImageClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer /> 
        {/*Попап: Форма редактирования профиля*/}
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
        />
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
      </CardsContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
