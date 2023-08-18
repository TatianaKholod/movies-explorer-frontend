import { useState, useEffect } from 'react';
import MoviesPage from '../MoviesPage/MoviesPage';

import moviesApi from '../../utils/MoviesApi';

function SavedMovies({ loggedIn }) {
  const [isLoading, setIsLoading] = useState(false);
  const [saveMoviesCardArr, setSaveMoviesCardArr] = useState([]);

  useEffect(() => {
    if (!loggedIn) return;
    setIsLoading(true);
    moviesApi
      .getSavedMovies()
      .then((data) => {
        setSaveMoviesCardArr(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('Ошибка получения данных' + err);
      })
      .finally(() => setIsLoading(false));
  }, [loggedIn]);

  return (
    <main>
      <MoviesPage isLoading={isLoading} moviesCardArr={saveMoviesCardArr} />
    </main>
  );
}

export default SavedMovies;
