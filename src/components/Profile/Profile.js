import { Link } from 'react-router-dom';
import { useState, useEffect,useContext } from 'react';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import './Profile.css';

function Profile({handleSignOut,handleSubmitEditProfile}) {
  const currentUser = useContext(CurrentUserContext);
  //признак для отображения формы сохранения профиля
  const [isEditableForm, setIsEditableForm] = useState(false);
  //добавить валидацию TODO
  const [isVaalid, setIsValid] = useState(false);
  //инпуты
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  //сообщение об ощибке
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  const editForm = () => {
    setIsEditableForm(true);
  };

  const handleSubmit = () => {
    handleSubmitEditProfile({name,email});
    // временно для тестирования верстки
    const saveOk = false;
    if (saveOk) {
      setIsEditableForm(false);
      setErrorMessage('');
    } else {
      setErrorMessage('При обновлении профиля произошла ошибка.');
    }
  };

  const handleChangeName = (e) => {
    (currentUser.name !== e.target.value) ? setIsValid(true): setIsValid(false);
    setName(e.target.value);
  }
  const handleChangeEmail = (e) => {
    (currentUser.email !== e.target.value) ? setIsValid(true): setIsValid(false);
    setEmail(e.target.value);
  }
  
  return (
    <main className='profile'>
      <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
      <div className='profile__container'>
        <label className='profile__label' htmlFor='name'>
          Имя
          <input
            className='profile__input'
            name='name'
            id='name'
            type='text'
            value={name||''}
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
            value={email||''}
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
            disabled={(errorMessage||!isVaalid) ? true : false}
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
          <Link className='profile__exit-link link link_color_red' onClick={handleSignOut} to='/'>
            Выйти из аккаунта
          </Link>
        </>
      )}
    </main>
  );
}

export default Profile;
