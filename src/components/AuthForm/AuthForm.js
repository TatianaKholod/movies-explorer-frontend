import { Link, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useEffect } from 'react';
import logo from '../../images/logo.svg';
import './AuthForm.css';

function AuthForm({
  caption,
  textButton,
  textLinkBefore,
  textLink,
  handleSubmit,
}) {
  const { values, handleChange, setValues } = useForm({
    'name-input': '',
    'email-input': '',
    'password-input': '',
  });

  const location = useLocation();

  useEffect(() => {
    setValues({ 'name-input': '', 'email-input': '', 'password-input': '' });
  }, [setValues]);

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit(values);
  }
  return (
    <form
      name='register'
      className='auth-form'
      onSubmit={onSubmit}
      autoComplete='off'
    >
      <Link className='link' to='/'>
        <img alt='Логотип проекта - movies-explorer' src={logo} />
      </Link>

      <h2 className='auth-form__caption'>{caption}</h2>
      <div className='auth-form__input-container'>
        {location.pathname === '/signin' ? null : (
          <label className='auth-form__label' htmlFor='name-input'>
            Имя
            <input
              name='name-input'
              id='name-input'
              type='text'
              value={values['name-input']}
              onChange={handleChange}
              className='auth-form__input'
              autoComplete='on'
              required
              minLength='2'
              maxLength='200'
            />
            <span className='auth-form__input-error name-input-error'></span>
          </label>
        )}
        <label className='auth-form__label' htmlFor='email-input'>
          E-mail
          <input
            name='email-input'
            id='email-input'
            type='email'
            value={values['email-input']}
            onChange={handleChange}
            className='auth-form__input'
            autoComplete='on'
            required
            minLength='2'
            maxLength='200'
          />
          <span className='auth-form__input-error email-input-error'></span>
        </label>

        <label className='auth-form__label' htmlFor='password-input'>
          Пароль
          <input
            name='password-input'
            id='password-input'
            type='password'
            value={values['password-input']}
            onChange={handleChange}
            className='auth-form__input'
            autoComplete='off'
            required
            minLength='3'
            maxLength='40'
          />
          <span className='auth-form__input-error password-input-error'>
            Что-то пошло не так...
          </span>
        </label>
      </div>

      <button
        name='register-button'
        type='submit'
        className='auth-form__button button'
      >
        {textButton}
      </button>

      <span className='auth-form__link-before'>
        {textLinkBefore}
        <Link
          className='auth-form__link link link_color_blu'
          to={location.pathname === '/signin' ? '/signup' : '/signin'}
        >
          {textLink}
        </Link>
      </span>
    </form>
  );
}

export default AuthForm;
