import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProtectedRoute from './ProtectedRoute';
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

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as authApi from '../../utils/AuthApi';
import moviesApi from '../../utils/MoviesApi';
import getAllMovies from '../../utils/MainApi';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  //для всех фильмов
  const [moviesAllCardsArr, setmoviesAllCardsArr] = useState(0);
  //для сохраненных фильмов
  const [savedMoviesAllCardArr, setSavedMoviesAllCardArr] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const [currentUser, setCurrentUser] = useState({});

  const checkToken = () => {
    return authApi
      .getToken()
      .then((data) => {
        if (data) {
          //установим тек. пользователя при входе
          setLoggedIn(true);
          setCurrentUser(data);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log('Ошибка ' + err);
      });
  };

  const handleSubmitRegister = (name, email, pwd) => {
    setErrMessage('');
    return authApi
      .register(name, email, pwd)
      .then(() => {
        handleSubmitLogin(email, pwd);
      })
      .catch((err) => {
        setErrMessage('Ошибка регистрации ' + err);
      });
  };

  const handleSubmitLogin = (email, pwd) => {
    setErrMessage('');
    return authApi
      .autorize(email, pwd)
      .then((data) => {
        setCurrentUser(data);
        localStorage.clear();
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        setErrMessage('Ошибка авторизации ' + err);
      });
  };
  const handleSignOut = () => {
    authApi
      .unAutorize()
      .then(() => {
        navigate('/');
        setLoggedIn(false);
        localStorage.clear();
      })
      .catch((err) => {
        console.log('Ошибка авторизации ' + err);
      });
  };
  const handleSubmitEditProfile = ({ name, email }) => {
    setErrMessage('');
    return authApi
      .updateProfile(name, email)
      .then((data) => {
        setCurrentUser(data);
        return data;
      })
      .catch((err) => {
        setErrMessage('При обновлении профиля произошла ошибка ' + err);
      });
  };
  const doDelLike = (idCard) => {
    return moviesApi
      .deleteSavedMovie(idCard)
      .then(() => {
        setSavedMoviesAllCardArr(
          savedMoviesAllCardArr.filter((item) => item._id !== idCard)
        );
      })
      .catch((err) => {
        console.log('Ошибка сохранения фильма' + err);
      });
  };

  const doAddLike = (movie) => {
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
    return moviesApi
      .addSavedMovie(savedMovie)
      .then((data) => {
        savedMoviesAllCardArr
          ? setSavedMoviesAllCardArr([data, ...savedMoviesAllCardArr])
          : setSavedMoviesAllCardArr([data]); //если данные из localStorage, то просто добавим, а при монитровании загрузится весь ??? TODO
      })
      .catch((err) => {
        console.log('Ошибка сохранения фильма' + err);
      });
  };

  //лайки на странице фильмов
  const handleOnClickLike = (movie) => {
    return movie.id ? doAddLike(movie) : doDelLike(movie);
  };
  //удаление на cтранице сохраненных файлов
  const handleOnClickDel = (movie) => {
    return doDelLike(movie);
  };
  // данные забираем здесь, чтобы при смене роутов не запрашивать еще раз
  const getInitialData = () => {
    if (!loggedIn) return;
    if (!moviesAllCardsArr) {
      return getInitialSaveData()
        .then(() =>
          getAllMovies().then((data) => {
            setmoviesAllCardsArr(data);
            return data;
          })
        )
        .catch(
          () =>
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
    }

    return new Promise((res) => {
      res(moviesAllCardsArr);
    });
  };

  const getInitialSaveData = () => {
    if (savedMoviesAllCardArr)
      return new Promise((res) => {
        res(savedMoviesAllCardArr);
      });
    return moviesApi
      .getSavedMovies()
      .then((data) => {
        setSavedMoviesAllCardArr(data);
        return data;
      })
      .catch(
        () =>
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );
  };

  useEffect(() => {
    if (!loggedIn) return;
    getInitialSaveData();
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={`App ${location.pathname === '/' ? 'App_gray' : ''}`}>
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route
            path='/signin'
            element={
              <Login
                handleSubmitLogin={handleSubmitLogin}
                errMessage={errMessage}
              />
            }
          />
          <Route
            path='/signup'
            element={
              <Register
                handleSubmitRegister={handleSubmitRegister}
                errMessage={errMessage}
              />
            }
          />
          <Route path='/' element={<Main />} />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={
                  <Movies
                    handleOnClickLike={handleOnClickLike}
                    getInitialData={getInitialData}
                    loggedIn={loggedIn}
                    arrForLikeCards={savedMoviesAllCardArr}
                  />
                }
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={
                  <SavedMovies
                    handleOnClickDel={handleOnClickDel}
                    loggedIn={loggedIn}
                    getInitialSaveData={getInitialSaveData}
                    arrForLikeCards={[]}
                  />
                }
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={
                  <Profile
                    handleSignOut={handleSignOut}
                    handleSubmitEditProfile={handleSubmitEditProfile}
                    errMessage={errMessage}
                    loggedIn={loggedIn}
                  />
                }
              />
            }
          />
          <Route path='*' element={<Page404 />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
