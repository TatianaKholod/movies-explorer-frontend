import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Profile.css';

function Profile({ user }) {
  const [isEditableForm, setIsEditableForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  const editForm = () => {
    setIsEditableForm(true);
  };

  const handleSubmit = () => {
    // временно для тестирования верстки
    const saveOk = false;
    if (saveOk) {
      setIsEditableForm(false);
      setErrorMessage('');
    } else {
      setErrorMessage('При обновлении профиля произошла ошибка.');
    }
  };

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  return (
    <main className='profile'>
      <h2 className='profile__title'>Привет, {user.name}!</h2>
      <div className='profile__container'>
        <label className='profile__label' htmlFor='name'>
          Имя
          <input
            className='profile__input'
            name='name'
            id='name'
            type='text'
            value={name}
            disabled={isEditableForm ? false : true}
            onChange={handleChangeName}
            placeholder='Имя'
            required
            minLength='2'
            maxLength='40'
          ></input>
        </label>

        <label className='profile__label' htmlFor='email'>
          E-mail
          <input
            className='profile__input'
            name='email'
            id='email'
            type='email'
            value={email}
            pattern=''
            disabled={isEditableForm ? false : true}
            onChange={handleChangeEmail}
            placeholder='E-mail'
            required
          ></input>
        </label>
      </div>

      {isEditableForm ? (
        <>
          <span className='profile__error'>{errorMessage}</span>
          <button
            className='profile__submit-btn button'
            type='submit'
            onClick={handleSubmit}
            disabled={errorMessage ? true : false}
          >
            Сохранить
          </button>
        </>
      ) : (
        <>
          <button
            className='profile__edit-btn link'
            type='button'
            onClick={editForm}
          >
            Редактировать
          </button>
          <Link className='profile__exit-link link link_color_red' to='/'>
            Выйти из аккаунта
          </Link>
        </>
      )}
    </main>
  );
}

export default Profile;
