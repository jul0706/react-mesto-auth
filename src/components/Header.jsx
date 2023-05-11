import logoPath from '../images/logo.svg'

function Header () {
    return (
        <header className="header">
           <img src={logoPath} alt="логотип сайта" className="header__logo" />

           <div className='header__auth-container'>
                <p className="header__login">example@mail.ru</p>
                <button type='button' className='header__button'>Войти</button>
           </div>
        </header>
    )
}

export default Header;