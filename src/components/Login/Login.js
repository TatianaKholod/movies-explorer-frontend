import AuthForm from '../AuthForm/AuthForm';

function Login({ handleSubmitLogin }) {
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
    />
  );
}

export default Login;
