import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import React, {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

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

  function handleCardDelete(id) { //удаление карточки
      api.deleteCard(id) //запрос на удаление карточки
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

  function handleUpdateAvatar (userObject) {
    api.changeAvatar(userObject)
    .then((res) => {
      setCurrentUser(res)
    })
    .catch(err => displayError(err));
    handleCloseAllPopups();
  }

  function handleAddCard (data) {
    api.addCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards ])
    })
    .catch(err => displayError(err));
    handleCloseAllPopups();
  }

  
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />        
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardImageClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer /> 
        {/*Попап: Форма редактирования профиля*/}
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/*Попап: Форма добавления карточки*/}
        <AddPlacePopup
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        handleCloseAllPopups={handleCloseAllPopups}
        onAddCard={handleAddCard}>
        </AddPlacePopup>        
        
        {/*Попап удаления карточки*/}
        <PopupWithForm 
            title='Вы уверены?' 
            name='delete-popup'
            textSubmitButton='Да'
            isOpen={false}
            onClose={handleCloseAllPopups}>
        </PopupWithForm>
        
        {/*Попап редактирования аватара*/}
        <EditAvatarPopup
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          handleCloseAllPopups={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}>
        </EditAvatarPopup>
         
         {/*Попап просмотра изображения карточки*/}
        <ImagePopup 
            card = {selectedCard}
            onClose={handleCloseAllPopups}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
