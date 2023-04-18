import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import React, {useState} from 'react';

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
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          onAddPlace={handleAddPlaceClick} 
          isAddPlacePopupOpen = {isAddPlacePopupOpen}
          onEditAvatar={handleEditAvatarClick}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
          onCardClick={handleCardImageClick}
          selectedCard={selectedCard}
        />
        <Footer />  
    </>
  );
}

export default App;
