import { Link, Route, Routes } from 'react-router-dom';
import HeaderNav from './HeaderNav/HeaderNav';
import logo from '../../images/logo.svg';
import './Header.css';

function Header({ loggedIn }) {
  const headerArr = loggedIn
    ? ['/movies', '/saved-movies', '/profile', '/']
    : ['/movies', '/saved-movies', '/profile'];
  return (
    <Routes>
      {headerArr.map((routPath, key) => (
        <Route
          key={key}
          path={routPath}
          element={
            <header className='header'>
              <Link className='link' to='/'>
                <img alt='Логотип проекта - movies-explorer' src={logo} />
              </Link>
              <HeaderNav />
            </header>
          }
        />
      ))}
      <Route
        path='/'
        element={
          <header className='header section-grey'>
            <Link className='link' to='/'>
              <img alt='Логотип проекта - movies-explorer' src={logo} />
            </Link>
            <div className='header__container-auth'>
              <Link className='header__link link' to='/signup'>
                Регистрация
              </Link>
              <Link className='header__button link button' to='/signin'>
                Войти
              </Link>
            </div>
          </header>
        }
      />
      <Route path='*' element={null} />
    </Routes>
  );
}

export default Header;
