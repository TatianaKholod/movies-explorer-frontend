import { useState, useEffect } from 'react';
import MoviesPage from '../MoviesPage/MoviesPage';
import doFilterData from '../../utils/Searh';

function Movies({
  handleOnClickLike,
  getInitialData,
  loggedIn,
  arrForLikeCards,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [moviesCardArr, setMoviesCardArr] = useState(null);
  const [searchWord, setSearchWord] = useState('');
  const [durationToggle, setDurationToggle] = useState(false);
  const [messageStr, setMessageStr] = useState('');

  useEffect(() => {
    if (!searchWord) return;
    setMessageStr('');
    setIsLoading(true);

    const getCurrentData = (arr) => {
      const resFilter = doFilterData(arr, searchWord, durationToggle);
      setMoviesCardArr(resFilter);
      if (resFilter.length === 0) setMessageStr('Ничего не найдено');
      else {
        // данные в localStorage обновляем после каждого поиска
        localStorage.setItem('durationToggle', durationToggle);
        localStorage.setItem('searchWord', searchWord);
        localStorage.setItem('moviesCardArr', JSON.stringify(resFilter));
      }
    };

    getInitialData()
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
  }, [searchWord, durationToggle, getInitialData, loggedIn]);

  useEffect(() => {
    if (!loggedIn) return;
    // если есть данные в localStorage - покажем их
    // нужно еще массив сохраненных фильмов получить, иначе лайки не проставить??? TODO
    const savedData = JSON.parse(localStorage.getItem('moviesCardArr'));
    if (!savedData) return;
    setMoviesCardArr(savedData);
  }, [loggedIn]);

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
        moviesCardArr={moviesCardArr || []}
        handleOnClickLike={handleOnClickLike}
        handleClicSearchBtn={handleClicSearchBtn}
        handleClicCheckDuration={handleClicCheckDuration}
        messageStr={messageStr}
        arrForLikeCards={arrForLikeCards}
      />
    </main>
  );
}

export default Movies;
