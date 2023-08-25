import { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register({ handleSubmitRegister }) {
  const [errMessage, setErrMessage] = useState('');
  const onRegister = (values) =>{
    return handleSubmitRegister(
      values['name-input'],
      values['email-input'],
      values['password-input']
    ).then((data) => {
      if (typeof data === 'string') 
        setErrMessage(data);
    });
  }

  return (
    <AuthForm
      caption='Добро пожаловать!'
      textButton='Зарегистрироваться'
      textLinkBefore='Уже зарегистрированы?'
      textLink='Войти'
      handleSubmit={onRegister}
      errMessage={errMessage}
    />
  );
}

export default Register;
