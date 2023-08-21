import { useState, useEffect } from 'react';
import MoviesPage from '../MoviesPage/MoviesPage';
import doFilterData from '../../utils/Searh';

function Movies({ handleOnClickLike, getInitialData, stateLike }) {
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
  }, [searchWord, durationToggle, getInitialData]);

  useEffect(() => {
    // если есть данные в localStorage - покажем их
    const savedData = JSON.parse(localStorage.getItem('moviesCardArr'));
    if (!savedData) return;
    setMoviesCardArr(savedData);
  }, []);

  useEffect(() => {
    //обновляем лайк в массиве и пересохраняем его в localStorage
    stateLike.movieId !== '' && moviesCardArr &&
      (moviesCardArr.find((item) => item.id === stateLike.movieId).like =
        stateLike.likeId);
    localStorage.setItem('moviesCardArr', JSON.stringify(moviesCardArr));
  }, [stateLike,moviesCardArr]);

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
        moviesCardArr={moviesCardArr||[]}
        handleOnClickLike={handleOnClickLike}
        handleClicSearchBtn={handleClicSearchBtn}
        handleClicCheckDuration={handleClicCheckDuration}
        messageStr={messageStr}
        stateLike={stateLike}
      />
    </main>
  );
}

export default Movies;
