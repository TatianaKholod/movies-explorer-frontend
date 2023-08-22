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

  const [moviesAllCardsArr, setmoviesAllCardsArr] = useState(0);
  //здесь будем хранить id карточки, которую добавляют или удаляют
  const [stateLike, setStateLike] = useState({ movieId: '', likeId: false });
  const [loggedIn, setLoggedIn] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    authApi
      .getToken()
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          //установим тек. пользователя при входе
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
        setErrMessage('При обновлении профиля произошла ошибка');
      });
  };
  const doDelLike = (movie) => {
    return moviesApi
      .deleteSavedMovie(movie._id ? movie._id : movie.like)
      .then(() => {
        const idDelCard = movie._id ? movie.movieId : movie.id;
        // выключим лайк, если данные не из localStorage то обновим данные в массиве
        if (moviesAllCardsArr) {
          moviesAllCardsArr.find((item) => item.id === idDelCard).like = false;
          setStateLike({ movieId: idDelCard, likeId: false });
          //setmoviesAllCardsArr(moviesAllCardsArr);
        }
        return false;
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
        // включим лайк, если данные не из localStorage то обновим там данные для последующих фильтраций
        if (moviesAllCardsArr) {
          moviesAllCardsArr.find((item) => item.id === data.movieId).like =
            data._id;
          // setmoviesAllCardsArr(moviesAllCardsArr); //TODO похоже не нужно - проверь
        }
        setStateLike({ movieId: data.movieId, likeId: data._id });
        return data._id;
      })
      .catch((err) => {
        console.log('Ошибка сохранения фильма' + err);
      });
  };
  const handleOnClickLike = (movie) => {
    //if (!loggedIn) return; //TODO
    return movie.like ? doDelLike(movie) : doAddLike(movie);
  };
  //удаление на мтранице сохраненных файлов
  const handleOnClickDel = (movie) => {
    doDelLike(movie);
  };
  // данные забираем здесь, чтобы при смене роутов не запрашивать еще раз
  const getInitialData = () => {
    if (!moviesAllCardsArr) {
      return getAllMovies()
        .then((data) => {
          // проставим лайки
          return moviesApi.getSavedMovies().then((savedData) => {
            // убедимся, что данные есть
            return typeof savedData === 'string' || typeof data === 'string'
              ? new Error('что-то не так с одним из серверов')
              : data.map((movie) => {
                  const saved = savedData.find(
                    (item) => item.movieId === movie.id
                  );
                  return {
                    ...movie,
                    like: saved ? saved._id : false,
                  };
                });
          });
        })
        .then((data) => {
          setmoviesAllCardsArr(data);
          return data;
        })
        .catch((err) => {
          return 'Ошибка получения данных ' + err;
        });
    }

    return new Promise((res) => {
      res(moviesAllCardsArr);
    });
  };

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
                    stateLike={stateLike}
                    loggedIn={loggedIn}
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
                    stateLike={stateLike}
                    loggedIn={loggedIn}
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
