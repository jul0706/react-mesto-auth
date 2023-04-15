function PopupWithForm ({name, title, textSubmitButton, children}) {
    return (
        <div className={`popup ${name}`}> {/*Попап на всю страницу*/}
            <div className={`popup-container ${name}-container`}> {/*Окно формы*/}
                <button className={`close-icon ${name}-container__close-icon`}></button> {/*Кнопка закрытия*/}
                <form name={`${name}`} action="#" className={`form-popup form-popup_type_${name}`} noValidate> {/*Форма*/}
                    <h2 className="form-popup__title">
                        {title}
                    </h2>
                    {children}
                    <button type="submit" className="form-popup__button-save">{textSubmitButton}</button>                    
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;