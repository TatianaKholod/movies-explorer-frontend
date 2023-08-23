import AuthForm from '../AuthForm/AuthForm';

function Register({ handleSubmitRegister, errMessage }) {
  function onRegister(values) {
    handleSubmitRegister(
      values['name-input'],
      values['email-input'],
      values['password-input']
    );
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
