import AuthForm from '../AuthForm/AuthForm';

function Login({ handleSubmitLogin, errMessage }) {
  function onLogin(values) {
    handleSubmitLogin(values['email-input'], values['password-input']);
  }

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
