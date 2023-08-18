import { useState, useEffect } from 'react';
import MoviesPage from '../MoviesPage/MoviesPage';
import doFilterData from '../../utils/Searh';

function Movies({ handleOnClickLike, getInitialData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [moviesCardArr, setMoviesCardArr] = useState(null);
  const [searchWord, setSearchWord] = useState('');
  const [durationTogl, setDurationTogl] = useState(false);
  const [messageStr, setMessageStr] = useState('');

  useEffect(() => {
    if (!searchWord) return;
    setMessageStr('');
    setIsLoading(true);

    const getCurrentData = (arr) => {
      const resFilter = doFilterData(arr,searchWord,durationTogl);
      setMoviesCardArr(resFilter);
      if (resFilter.length === 0) setMessageStr('Ничего не найдено');
      else {
        // данные в localStorage обновляем после каждого поиска
        localStorage.setItem('durationTogl', durationTogl);
        localStorage.setItem('searchWord', searchWord);
        localStorage.setItem('moviesCardArr', JSON.stringify(resFilter)); //удалить при выходе из аккаунта localStorage.clear() TODO
      }
    };
    getInitialData()
      .then((data) => {
        setIsLoading(false);
        typeof data === 'string'
          ? setMessageStr(
              'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
            )
          : getCurrentData(data);
      })
      .catch((err) => {
        console.log('Ошибка получения данных' + err);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [searchWord, durationTogl]);

  useEffect(() => {
    // если есть данные в localStorage - покажем их
    const savedData = JSON.parse(localStorage.getItem('moviesCardArr'));
    if (!savedData) return;
    setMoviesCardArr(savedData);
  }, []);

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
        moviesCardArr={moviesCardArr}
        handleOnClickLike={handleOnClickLike}
        handleClicSearchBtn={handleClicSearchBtn}
        handleClicCheckDuration={handleClicCheckDuration}
        messageStr={messageStr}
      />
    </main>
  );
}

export default Movies;
