import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {

    const user = React.useContext(CurrentUserContext); //подписались на контекст текущего пользователя
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChange (e) {
        if (e.target.name === 'name') {
            setName(e.target.value)
        } else {
            setDescription(e.target.value)
        }
    }

    function handleSubmit (e) { //обработчик отправки формы
        e.preventDefault();
        onUpdateUser({ //обновили информацию о пользователе
            name: name,
            about: description,
          })
    }

    React.useEffect(() => {
        if (user) {
            setName(user.name);
            setDescription(user.about);
        }
    }, [user]);
    
    return (
        <PopupWithForm
            title='Редактировать профиль' 
            name='profile-popup'
            textSubmitButton='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
                <fieldset className="form-popup__inputs">
                    <input 
                        type="text" 
                        id="name-input" 
                        name="name" 
                        className="form-popup__input form-popup__input_type_name" 
                        minLength="2" 
                        maxLength="40" 
                        placeholder="Ваше имя" 
                        onChange={handleChange}
                        value={name}
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
                        value={description}
                        onChange={handleChange}
                        required
                    />
                    <span className="job-input-error form-popup__error"></span>
                </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;