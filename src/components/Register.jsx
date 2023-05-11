
function Register () {
    return (
        <div className="login">
            <h2 className="login__title">Регистрация</h2>
            <form action="#" className="login__form">
                <input 
                    type="email" 
                    name="email" 
                    className="login__input" 
                    placeholder="Email"
                />
                <input 
                    type="password" 
                    name="password" 
                    className="login__input" 
                    minLength="8"
                    placeholder="Пароль"
                />
                <button className="login__button">Зарегистрироваться</button>
            </form>
            <p className="login__caption">Уже зарегистрированы? <a className="login__entry-link" href="#">Войти</a></p>
        </div>
    )
}

export default Register;