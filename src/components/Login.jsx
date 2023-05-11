
function Login () {
    return (
        <div className="login">
            <h2 className="login__title">Вход</h2>
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
                <button className="login__button">Войти</button>
            </form>
        </div>
    )
}

export default Login;