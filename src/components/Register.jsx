import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/Auth";
import { useState } from "react";


function Register({ userEmail, setEmail, setisInfoTooltipPopupOpen, setisAuthComplete }) {

    const [password, setPassword] = useState('') //стэйт пароля

    const [formValue, setFormValue] = useState({ //стэйт формы регистрации
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleRegister = (e) => { //отправка формы регистрации
        e.preventDefault();
        auth.register(formValue)
            .then((data) => {
                setEmail(data.data.email);
                setPassword(formValue.password);
                navigate('/sign-in', { replace: true });
                setisAuthComplete(true); //авторизация успешна
                setisInfoTooltipPopupOpen(true); //открыть попап
            })
            .catch(() => { //при ошибке
                setisAuthComplete(false); //стейт авторизации - неуспешна
                setisInfoTooltipPopupOpen(true); //открыть попап
            })
    }

    return (
        <div className="login">
            <h2 className="login__title">Регистрация</h2>
            <form className="login__form" onSubmit={handleRegister}>
                <input
                    type="email"
                    name="email"
                    className="login__input"
                    placeholder="Email"
                    value={formValue.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    className="login__input"
                    minLength="8"
                    placeholder="Пароль"
                    value={formValue.password}
                    onChange={handleChange}
                />
                <button type='submit' className="login__button">Зарегистрироваться</button>
            </form>
            <p className="login__caption">Уже зарегистрированы? <Link className="login__entry-link" to="/sign-in">Войти</Link></p>
        </div>
    )
}

export default Register;