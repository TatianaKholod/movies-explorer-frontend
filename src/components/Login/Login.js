import { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Login({ handleSubmitLogin }) {
  const [errMessage, setErrMessage] = useState('');
  const onLogin = (values) => {
    handleSubmitLogin(values['email-input'], values['password-input']).then(
      (data) => {
        if (typeof data === 'string') setErrMessage(data);
      }
    );
  };

  return (
    <AuthForm
      caption='Рады видеть!'
      textButton='Войти'
      textLinkBefore='Ещё не зарегистрированы?'
      textLink='Регистрация'
      handleSubmit={onLogin}
      errMessage={errMessage}
    />
  );
}

export default Login;
