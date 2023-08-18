import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
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

import * as authApi from '../../utils/Auth';
import moviesApi from '../../utils/MoviesApi';
import getAllMovies from '../../utils/MainApi';

const handleSubmitRegister = (name, email, pwd) => {
  //здесь будет регистрация
  console.log(`${name}, ${email}, ${pwd}`);
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [moviesAllCardsArr, setmoviesAllCardsArr] = useState(null);

  const handleSubmitLogin = (email, pwd) => {
    return authApi
      .autorize(email, pwd)
      .then(() => {
        //handleLogin(email); TODO
        navigate('/movies');
      })
      .catch((err) => {
        console.log('Ошибка авторизации ' + err);
        //handleIsOpenAuthMsg(true); TODO
      });
  };

  const handleOnClickLike = (movie) => {
    //if (!loggedIn) return;
    const savedMovie = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      trailer: movie.trailerLink,
      thumbnail: movie.image,
      movieId: movie.id,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };
    moviesApi.addSavedMovie(savedMovie).catch((err) => {
      console.log('Ошибка сохранения фильма' + err);
    });
  };

  // данные забираем здесь, чтобы при смене роутов не запрашивать еще раз
  const getInitialData = () => {
    if (!moviesAllCardsArr) {
    return getAllMovies()
      .then((data) => {
        setmoviesAllCardsArr(data);
        return data;
      })
      .catch((err) => {
        return('Ошибка получения данных' + err);
      });
   }

    return new Promise((res) => {res(moviesAllCardsArr)});  
  };
 
  return (
    <div className={`App ${location.pathname === '/' ? 'App_gray' : ''}`}>
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
        <Route
          path='/movies'
          element={
            <Movies
              handleOnClickLike={handleOnClickLike}
              getInitialData={getInitialData}
            />
          }
        />
        <Route path='/saved-movies' element={<SavedMovies loggedIn={true} />} />
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
