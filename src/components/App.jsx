import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import React, { useState, useEffect } from 'react';
import { doc } from "prettier";
function App() {
  {/*Создаем внутренние состояния для попапов*/}
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); 
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

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

  function handleCloseAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
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
        />
        <Footer />  
    </>
  );
}

export default App;
