import { Route, Routes, useLocation } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Page404 from '../Page404/Page404';

import './App.css';

const handleSubmitRegister = (name, email, pwd) => {
  //здесь будет регистрация
  console.log(`${name}, ${email}, ${pwd}`);
};

const handleSubmitLogin = (email, pwd) => {
  //здесь будет авторизация
  console.log(`${email}, ${pwd}`);
};

function App() {
  const location = useLocation();
  return (
    <div className={`App ${location.pathname === '/' ? 'App_gray' :''}`}>
      <Header />
      <Routes>
        <Route
          path='/signin'
          element={<Login handleSubmitLogin={handleSubmitLogin} />}
        />
        <Route
          path='/signup'
          element={<Register handleSubmitRegister={handleSubmitRegister} />}
        />
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route
          path='/profile'
          element={
            <Profile user={{ name: 'Виталий', email: 'pochta@yandex.ru' }} />
          }
        />
        <Route path='*' element={<Page404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
