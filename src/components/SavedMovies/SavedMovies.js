import { useState, useEffect } from 'react';
import MoviesPage from '../MoviesPage/MoviesPage';
import doFilterData from '../../utils/Searh';

import moviesApi from '../../utils/MoviesApi';

function SavedMovies() {
  const [isLoading, setIsLoading] = useState(false);
  const [savedMoviesAllCardArr, setSavedMoviesAllCardArr] = useState(null);
  const [savedMoviesCardArr, setSavedMoviesCardArr] = useState(null);
  const [searchWord, setSearchWord] = useState('');
  const [durationTogl, setDurationTogl] = useState(false);
  const [messageStr, setMessageStr] = useState('');

  //получим данные, если авторизованы
  useEffect(() => {
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
  }, []);

  //отсортируем данные, если изменились параметры поиска
  useEffect(() => {
    if (!savedMoviesAllCardArr) return;
      const resFilter = doFilterData(savedMoviesAllCardArr,searchWord,durationTogl);
      setSavedMoviesCardArr(resFilter);
      if (resFilter.length === 0) setMessageStr('Ничего не найдено');
    
  }, [searchWord, durationTogl, savedMoviesAllCardArr]);

  const handleClicSearchBtn = (keyWord, checkDuration) => {
    setSearchWord(keyWord);
    setDurationTogl(checkDuration);
  };

  const handleClicCheckDuration = (checkDuration, keyWord) => {
    setSearchWord(keyWord);
    setDurationTogl(checkDuration);
  };


  return (
    <main>
      <MoviesPage
        isLoading={isLoading}
        moviesCardArr={savedMoviesCardArr||[]}
        handleClicSearchBtn={handleClicSearchBtn}
        handleClicCheckDuration={handleClicCheckDuration}
        messageStr={messageStr}
      />
    </main>
  );
}

export default SavedMovies;
