import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import './Profile.css';

function Profile({ handleSignOut, handleSubmitEditProfile, loggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  //признак для отображения формы сохранения профиля
  const [isEditableForm, setIsEditableForm] = useState(false);
  const [nameBtnEdit, setNameBtnEdit] = useState('Редактировать');
  const [errMessage, setErrMessage] = useState('');

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({
      name: currentUser.name,
      email: currentUser.email,
    });

  useEffect(() => {
    if (!loggedIn) return;
    resetForm();
    setErrMessage('');
    setNameBtnEdit('Редактировать');
  }, [loggedIn, resetForm]);

  const editForm = () => {
    setIsEditableForm(true);
  };

  const isNotModified = () => {
    return (
      currentUser.name === values.name || currentUser.email === values.email
    );
  };

  const handleOnClickBtn = (e) => {
    //защитимся от многократных нажатий
    e.target.disabled = true;

    handleSubmitEditProfile({
      name: values.name || currentUser.name,
      email: values.email || currentUser.email,
    }).then((data) => {
      if (typeof data === 'string') {
        setErrMessage(data);
        setIsEditableForm(true);
      } else {
        setIsEditableForm(false);
        setNameBtnEdit('Данные сохранены. Редактировать снова');
      }
    });
  };
  return (
    <form className='profile' name='profile' autoComplete='off'>
      <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
      <div className='profile__container'>
        <label className='profile__label' htmlFor='name'>
          Имя
          <input
            className='profile__input'
            name='name'
            id='name'
            type='text'
            value={values.name || currentUser.name || ''}
            disabled={isEditableForm ? false : true}
            onChange={handleChange}
            placeholder='Имя'
            required
            minLength='2'
            maxLength='40'
            pattern='^[A-zЁёА-я\-\s]+$'
          ></input>
        </label>
        <span className='profile__error'>{errors.name}</span>

        <label className='profile__label' htmlFor='email'>
          E-mail
          <input
            className='profile__input'
            name='email'
            id='email'
            type='email'
            value={values.email || currentUser.email || ''}
            disabled={isEditableForm ? false : true}
            onChange={handleChange}
            placeholder='E-mail'
            required
          ></input>
        </label>
        <span className='profile__error'>{errors.email}</span>
      </div>

      {isEditableForm ? (
        <>
          <span className='profile__error'>{errMessage}</span>
          <button
            className='profile__submit-btn button'
            type='submit'
            onClick={handleOnClickBtn}
            disabled={!isValid || isNotModified() ? true : false}
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
            {nameBtnEdit}
          </button>
          <Link
            className='profile__exit-link link link_color_red'
            onClick={handleSignOut}
            to='/'
          >
            Выйти из аккаунта
          </Link>
        </>
      )}
    </form>
  );
}

export default Profile;
