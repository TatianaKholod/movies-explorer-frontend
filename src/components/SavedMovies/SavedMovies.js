import { useState, useEffect } from 'react';
import MoviesPage from '../MoviesPage/MoviesPage';
import doFilterData from '../../utils/Searh';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedMovies({
  loggedIn,
  getInitialSaveData,
  arrForLikeCards,
  handleOnClickDel,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [savedMoviesCardArr, setSavedMoviesCardArr] = useState(null);
  const [searchWord, setSearchWord] = useState('');
  const [durationToggle, setDurationToggle] = useState(false);
  const [messageStr, setMessageStr] = useState('');

  //отобразим или отсортируем данные, если изменились параметры поиска
  useEffect(() => {
    if (!loggedIn) return;
    setIsLoading(true);
    setMessageStr('');

    const getCurrentData = (arr) => {
      const resFilter = doFilterData(arr, searchWord, durationToggle);
      setSavedMoviesCardArr(resFilter);
      if (resFilter.length === 0) setMessageStr('Ничего не найдено');
    };

    getInitialSaveData()
      .then((data) => {
        setIsLoading(false);
        typeof data === 'string' ? setMessageStr(data) : getCurrentData(data);
      })
      .catch((err) => {
        console.log('Ошибка получения данных' + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [loggedIn, searchWord, durationToggle, getInitialSaveData]);

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
        handleOnClickLike={handleOnClickDel}
        handleClicSearchBtn={handleClicSearchBtn}
        handleClicCheckDuration={handleClicCheckDuration}
        messageStr={messageStr}
        arrForLikeCards={arrForLikeCards}
      />
    </main>
  );
}

export default SavedMovies;
