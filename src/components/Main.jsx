import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function Main () {
    
    
    function checkPressEsc (evt) { // обработчик проверка нажатой клавиши
        if (evt.key === 'Escape') { //если нашали Esc
            close()
        }
    }
    function close () {
        window.removeEventListener('keydown', checkPressEsc) //удалить слушатель закрытия по Esc
        document.querySelector('.profile-popup').classList.remove('popup_is-opened'); //удалили класс
    }
    

    function handleEscClose () {
        window.addEventListener('keydown', checkPressEsc)
    }

    function checkPressOverlay (evt) {
        if (evt.target === evt.currentTarget) {
            close()
        }
    }
    
    function handleEditAvatarClick () {
        document.querySelector('.profile-popup').classList.add('popup_is-opened'); //добавили класс
        document.querySelector('.profile-popup').addEventListener('click', (evt)=>{checkPressOverlay(evt)});
        document.querySelector('.profile-popup-container__close-icon').addEventListener('click', ()=>{close()})
        handleEscClose(); //добавили слушатель закрытия по Esc
    }
    function handleEditProfileClick () {
        console.log('Hi')
    }

    function handleAddPlaceClick () {
        console.log('Hello')
    }

    return (
        <main className="main"> 
            {/*Блок profile*/}
            <section className="profile">
                <button className="profile__avatar-button" onClick={handleEditAvatarClick}>
                    <img src="#" alt="аватар пользователя" className="profile__avatar" />  {/*Аватар */}
                </button>
                {/*Контейнер для заголовка, подзаголовка  на 1024*/}
                <div className="profile__title-and-subtitle-form"> 
                    <div className="profile__title-form"> {/*Контейнер для заголовка с кнопкой*/}
                        <h1 className="profile__title"></h1>
                        <button type="button" className="profile__edit-button" aria-label="кнопка редактирования" onClick={handleEditProfileClick}></button> {/*Кнопка "редактировать*/}
                    </div> 
                    <p className="profile__subtitle"></p>
                </div> 
                <button type="button" className="add-button" aria-label="кнопка добавления карточки" onClick={handleAddPlaceClick}></button>{/*Кнопка "добавить"*/}
            </section>
                {/*Блок Places*/}
            <section className="places">
                {/*Заготовка для карточки*/}
                <template id="place__template">
                    <article className="place">
                        <button className="place__delete-icon"></button>
                        <img className="place__image" 
                        /> {/*Изобажение*/}
                        <div className="place__caption"> {/*Контейнер для нижней белой части*/}
                            <h2 className="place__title">
                            </h2>
                            <div className="place__like-area">
                                <button type="button" className="place__like-button" aria-label="кнопка понравилось"></button>
                            </div>
                        </div>
                    </article>
                </template>
            </section>
            {/*Попап: Форма редактирования профиля*/}
        <PopupWithForm  title='Обновить аватар' 
            name='profile-popup'
            textSubmitButton='Сохранить'>
                <fieldset className="form-popup__inputs">
                <input type="text" id="name-input" name="name" className="form-popup__input form-popup__input_type_name" minLength="2" maxLength="40" placeholder="Ваше имя" required/>
                <span className="name-input-error form-popup__error"></span>
                <input type="text" id="job-input" name="about" className="form-popup__input form-popup__input_type_job" minLength="2" maxLength="200" placeholder="Ваш род деятельности" required/>
                <span className="job-input-error form-popup__error"></span>
                </fieldset>
        </PopupWithForm>
        {/*Попап: Форма добавления карточки*/}
        <div className="popup add-button-popup"> {/*Попап на всю страницу*/}
            <div className="popup-container add-button-popup-container"> {/*Окно формы*/}
                <button className="close-icon add-button-popup-container__close-icon"></button> {/*Кнопка закрытия*/}
                <form name="add-card-form" action="#" className="form-popup form-popup_type_add" noValidate > {/*Форма*/}
                    <h2 className="form-popup__title">
                        Новое место
                    </h2>
                    <fieldset className="form-popup__inputs">
                        <input type="text" id='place-input' name="name" className="form-popup__input form-popup__input_type_place" minLength="2" maxLength="30" placeholder="Название" required />
                        <span className="place-input-error form-popup__error"></span>
                        <input type="url" id="link-input" name="link" className="form-popup__input form-popup__input_type_link" placeholder="Ссылка на картинку" required />
                        <span className="link-input-error form-popup__error"></span>
                    </fieldset>
                    <button type="submit" className="form-popup__button-save">Создать</button>
                </form>
            </div>
        </div>
        {/*Попап просмотра изображения карточки*/}
        <div className="popup place-popup"> {/*Попап на всю страницу*/}
            <div className="img-popup-container"> {/*Окно изображения*/}
                <button className="close-icon img-popup-container__close-icon"></button> {/*Кнопка закрытия*/}
                <figure className="image-figure">
                    <img className="image-figure__image" src="#" alt="#" />
                    <figcaption className="image-figure__caption"></figcaption>
                </figure>
            </div>
        </div> 
        
        {/*Попап удаления карточки*/}
        <div className="popup delete-popup">
            <div className="popup-container delete-popup-container">
                <button className="close-icon delete-popup-container__close-icon"></button>
                <form name="delete-form" action="#" className="form-popup form-popup_type_delete" noValidate>
                    <h2 className="form-popup__title">
                        Вы уверены?
                    </h2>
                    <button type="submit" className="form-popup__button-save">Да</button>    
                </form>
            </div>
        </div>
        
        {/*Попап редактирования аватара*/}
        <div className="popup edit-avatar-popup">
            <div className="popup-container edit-avatar-popup-container">
                <button className="close-icon edit-avatar-popup-container__close-icon"></button>
                <form name="edit-avatar-form" action="#" className="form-popup form-popup_type_avatar" noValidate>
                    <h2 className="form-popup__title">
                        Обновить аватар
                    </h2>
                    <fieldset className="form-popup__inputs">
                        <input type="url" id='avatar-input' name="avatar" className="form-popup__input form-popup__input_type_avatar" placeholder="Ссылка на изображение" required />
                        <span className="avatar-input-error form-popup__error"></span>
                    </fieldset>
                    <button type="submit" className="form-popup__button-save">Сохранить</button>   
                </form>
            </div>
        </div>
    </main>
    )
}

export default Main;