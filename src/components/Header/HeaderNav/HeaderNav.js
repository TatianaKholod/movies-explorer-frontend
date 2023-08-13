import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import accountIcon from '../../../images/account-icon.svg';
import useClose from '../../../hooks/useClose';
import './HeaderNav.css';

const NavLinkArr = [
  { name: 'Фильмы', link: '/movies' },
  { name: 'Сохраненные фильмы', link: '/saved-movies' },
];

function HeaderNav() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOnClickMenu = () => setIsOpenMenu(!isOpenMenu);
  const closeMenu = () => {
    if (isOpenMenu) handleOnClickMenu();
  };

  useClose(isOpenMenu, handleOnClickMenu);

  return (
    <nav
      className={`header__nav  ${isOpenMenu ? 'header__nav_menu-opened' : ''}`}
    >
      <div
        className={`header__menu-button-container link ${
          isOpenMenu ? 'header__menu-button-container_menu-opened' : ''
        }`}
        onClick={handleOnClickMenu}
      >
        {isOpenMenu ? (
          <span className='header__menu-btn-close'>+</span>
        ) : (
          <span className='header__menu-btn-burger'>{`\u2013 \u2013 \u2013`}</span>
        )}
      </div>
      <ul
        className={`header__nav-container  ${
          isOpenMenu ? 'header__nav-container_menu-opened' : ''
        }`}
      >
        {isOpenMenu ? (
          <li>
            <Link className='header__nav-link link ' to='/'>
              Главная
            </Link>
          </li>
        ) : null}
        {NavLinkArr.map((i, key) => (
          <li key={`nav${key}`}>
            <NavLink
              className={(props) =>
                `header__nav-link link ${
                  props.isActive ? 'header__nav-link_on' : ''
                }`
              }
              end
              to={i.link}
              onClick={closeMenu}
            >
              {i.name}
            </NavLink>
          </li>
        ))}
        <li className='header__btn-account-container'>
          <Link
            className='header__button-account link'
            to='/profile'
            onClick={closeMenu}
          >
            <img alt='Аккаунт' src={accountIcon} />
            Аккаунт
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
