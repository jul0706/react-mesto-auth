import logoPath from '../images/logo.svg';
import { useNavigate } from 'react-router-dom';

function Header({ isLoggedIn, userEmail, onLogout }) {

    const navigate = useNavigate();

    function logOut() { //выход из системы
        localStorage.removeItem('token'); //удалили токен
        onLogout(false) //обновили стэйт
        navigate('/sign-in', { replace: true }); //перенаправили на страницу входа
    }

    return (
        <header className="header">
            <img src={logoPath} alt="логотип сайта" className="header__logo" />

            <div className='header__auth-container'>
                {isLoggedIn && <p className="header__login">{userEmail}</p>} {/*Если пользователь авторизован, показать почту*/}
                <button type='button' className='header__button' onClick={logOut}>
                    {isLoggedIn ? 'Выйти' : (window.location.href === 'http://localhost:3000/sign-in' ? 'Регистрация' : 'Войти')}
                </button>
            </div>
        </header>
    )
}

export default Header;