function Card ({cardData, handleCardClick}) {
    return (
        <article className="place">
            <button className="place__delete-icon"></button>
            <img src={`${cardData.link}`}className="place__image" 
             /> {/*Изобажение*/}
            <div className="place__caption"> {/*Контейнер для нижней белой части*/}
                <h2 className="place__title">
                    {cardData.name}
                </h2>
                <div className="place__like-area">
                    <button type="button" className="place__like-button" aria-label="кнопка понравилось"></button>
                       {cardData.likes.length != 0 && <p className='place__like-amount'>{cardData.likes.length}</p>} {/*если у карточки есть лайки, показать их количество */}
                </div>
            </div>
        </article>
    )
}

export default Card;