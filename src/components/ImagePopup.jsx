function ImagePopup () {
    return (
        <div className="popup place-popup"> {/*Попап на всю страницу*/}
            <div className="img-popup-container"> {/*Окно изображения*/}
                <button className="close-icon img-popup-container__close-icon"></button> {/*Кнопка закрытия*/}
                <figure className="image-figure">
                    <img className="image-figure__image" src="#" alt="#" />
                    <figcaption className="image-figure__caption"></figcaption>
                </figure>
            </div>
        </div> 
    )
}

export default ImagePopup;