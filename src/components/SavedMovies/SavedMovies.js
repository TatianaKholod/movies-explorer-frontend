import { useState, useEffect } from 'react';
import MoviesPage from '../MoviesPage/MoviesPage';
import doFilterData from '../../utils/Searh';

import moviesApi from '../../utils/MoviesApi';

//function SavedMovies({ handleOnClickDel, stateLike }) {
  function SavedMovies(loggedIn) {
  const [isLoading, setIsLoading] = useState(false);
  const [savedMoviesAllCardArr, setSavedMoviesAllCardArr] = useState(null);
  const [savedMoviesCardArr, setSavedMoviesCardArr] = useState(null);
  const [searchWord, setSearchWord] = useState('');
  const [durationToggle, setDurationToggle] = useState(false);
  const [messageStr, setMessageStr] = useState('');

  //получим данные, если авторизованы
  useEffect(() => {
    if (!loggedIn) return;
    setIsLoading(true);
    setMessageStr('');
    moviesApi
      .getSavedMovies()
      .then((data) => {
        setSavedMoviesAllCardArr(data);
        setSavedMoviesCardArr(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('Ошибка получения данных' + err);
        setMessageStr(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
      })
      .finally(() => setIsLoading(false));
  }, [loggedIn]);

  //отсортируем данные, если изменились параметры поиска
  useEffect(() => {
    if (!savedMoviesAllCardArr) return;
    const resFilter = doFilterData(
      savedMoviesAllCardArr,
      searchWord,
      durationToggle
    );
    setSavedMoviesCardArr(resFilter);
    if (resFilter.length === 0) setMessageStr('Ничего не найдено');
  }, [searchWord, durationToggle, savedMoviesAllCardArr]);

 /* useEffect(() => {
    //для удаленной карточки likeId будет false
    if (!stateLike.likeId && stateLike.movieId) {
      if (!setSavedMoviesAllCardArr)
      setSavedMoviesAllCardArr(
        savedMoviesAllCardArr.filter((m) => m.movieId !== stateLike.movieId)
      );
      // если отображен отфильтрованный массив, то нужно и там удалить
      if (!setSavedMoviesCardArr)
        setSavedMoviesCardArr(
          setSavedMoviesCardArr.filter((m) => m.movieId !== stateLike.movieId)
        );
    }
  }, [stateLike, savedMoviesAllCardArr, savedMoviesCardArr]);*/

  const handleClicSearchBtn = (keyWord, checkDuration) => {
    setSearchWord(keyWord);
    setDurationToggle(checkDuration);
  };

  const handleClicCheckDuration = (checkDuration, keyWord) => {
    setSearchWord(keyWord);
    setDurationToggle(checkDuration);
  };

  return (
    <main>
      <MoviesPage
        isLoading={isLoading}
        moviesCardArr={savedMoviesCardArr || []}
        //handleOnClickLike={handleOnClickDel}
        handleClicSearchBtn={handleClicSearchBtn}
        handleClicCheckDuration={handleClicCheckDuration}
        messageStr={messageStr}
      />
    </main>
  );
}

export default SavedMovies;
