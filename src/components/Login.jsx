import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { auth } from "../utils/auth";

function Login({ onLogin, userEmail, setEmail, displayError }) {

    const [password, setPassword] = useState('');

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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password) { //если одно из полей не заполнено
            return;
        }
        auth.login(formValue)
            .then((res) => {
                onLogin(true);
                setEmail(formValue.email);
                setPassword(formValue.password);
                setFormValue({ email: '', password: '' });
                navigate('/mesto-react', { replace: true });
            })
            .catch(err => displayError(err))
    }

    return (
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <form onSubmit={handleSubmit} className="login__form">
                <input
                    type="email"
                    name="email"
                    className="login__input"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    className="login__input"
                    minLength="8"
                    placeholder="Пароль"
                    onChange={handleChange}
                />
                <button className="login__button">Войти</button>
            </form>
        </div>
    )
}

export default Login;