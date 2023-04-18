import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import api from '../utils/Api';
import Card from './Card';
import ImagePopup from './ImagePopup';

function Main ({onEditProfile, isEditProfilePopupOpen, 
                onAddPlace, isAddPlacePopupOpen, 
                onEditAvatar, isEditAvatarPopupOpen,
                onClose,
                onCardClick, selectedCard
            }) {

    const [userName, setUserName] = useState(''); 
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]); 

    function displayError (err) { //показ ошибки от сервера
        alert(err)
    };

    useEffect(()=>{
    Promise.all([ //ждем, когда придут данные пользователя и данные карточек
        api.getDataServer('users/me'),
        api.getDataServer('cards')
    ])
    .then((values)=>{
        setUserName(values[0].name);//обновили состояние переменных
        setUserDescription(values[0].about);
        setUserAvatar(values[0].avatar);
        setCards(values[1])
    },[])
    .catch(err => displayError(err));
        },[]
    )
    return (
        <main className="main"> 
            {/*Блок profile*/}
            <section className="profile">
                <button className="profile__avatar-button" onClick={onEditAvatar}>
                    <img src={`${userAvatar}`} alt="аватар пользователя" className="profile__avatar" />  {/*Аватар */}
                </button>
                {/*Контейнер для заголовка, подзаголовка  на 1024*/}
                <div className="profile__title-and-subtitle-form"> 
                    <div className="profile__title-form"> {/*Контейнер для заголовка с кнопкой*/}
                        <h1 className="profile__title">{userName}</h1>
                        <button type="button" className="profile__edit-button" aria-label="кнопка редактирования" onClick={onEditProfile}></button> {/*Кнопка "редактировать*/}
                    </div> 
                    <p className="profile__subtitle">{userDescription}</p>
                </div> 
                <button type="button" className="add-button" aria-label="кнопка добавления карточки" onClick={onAddPlace}></button>{/*Кнопка "добавить"*/}
            </section>
                {/*Блок Places*/}
            <section className="places">
                {/*Заготовка для карточки*/}
                {cards.map((card) => ( // каждую карточку из массива добавляем на страницу
                    <div key = {card._id}>
                    <Card 
                        cardData = {card} 
                        onCardClick = {onCardClick}
                    />
                    </div>
                ))}
            </section>
            {/*Попап: Форма редактирования профиля*/}
        <PopupWithForm  
            title='Редактировать профиль' 
            name='profile-popup'
            textSubmitButton='Сохранить'
            isOpen={isEditProfilePopupOpen}
            onClose={onClose}>
                <fieldset className="form-popup__inputs">
                    <input type="text" id="name-input" name="name" className="form-popup__input form-popup__input_type_name" minLength="2" maxLength="40" placeholder="Ваше имя" defaultValue = {userName} required/>
                    <span className="name-input-error form-popup__error"></span>
                    <input type="text" id="job-input" name="about" className="form-popup__input form-popup__input_type_job" minLength="2" maxLength="200" placeholder="Ваш род деятельности" defaultValue = {userDescription} required/>
                    <span className="job-input-error form-popup__error"></span>
                </fieldset>
        </PopupWithForm>
        {/*Попап: Форма добавления карточки*/}
        <PopupWithForm 
            title='Новое место' 
            name='add-button-popup'
            textSubmitButton='Создать'
            isOpen={isAddPlacePopupOpen}
            onClose={onClose}>
                <fieldset className="form-popup__inputs">
                    <input type="text" id='place-input' name="name" className="form-popup__input form-popup__input_type_place" minLength="2" maxLength="30" placeholder="Название" required />
                    <span className="place-input-error form-popup__error"></span>
                    <input type="url" id="link-input" name="link" className="form-popup__input form-popup__input_type_link" placeholder="Ссылка на картинку" required />
                    <span className="link-input-error form-popup__error"></span>
                </fieldset>
        </PopupWithForm>
        
        {/*Попап просмотра изображения карточки*/}
        
        
        {/*Попап удаления карточки*/}
        <PopupWithForm 
            title='Вы уверены?' 
            name='delete-popup'
            textSubmitButton='Да'
            isOpen={false}
            onClose={onClose}>
        </PopupWithForm>
        
        {/*Попап редактирования аватара*/}
        <PopupWithForm 
            title='Обновить аватар' 
            name='edit-avatar-popup'
            textSubmitButton='Сохранить'
            isOpen={isEditAvatarPopupOpen}
            onClose={onClose}>
                <fieldset className="form-popup__inputs">
                    <input type="url" id='avatar-input' name="avatar" className="form-popup__input form-popup__input_type_avatar" placeholder="Ссылка на изображение" required />
                    <span className="avatar-input-error form-popup__error"></span>
                </fieldset>
        </PopupWithForm>

        <ImagePopup 
            card = {selectedCard}
            onClose={onClose}
        />
    </main>
    )
}

export default Main;