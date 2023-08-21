import AuthForm from '../AuthForm/AuthForm';

function Register({ handleSubmitRegister }) {
  
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
    />
  );
}

export default Register;
