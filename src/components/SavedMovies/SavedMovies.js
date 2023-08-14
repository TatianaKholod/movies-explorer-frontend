import { useState, useEffect } from 'react';
import MoviesPage from '../MoviesPage/MoviesPage';

// временно для тестирования верстки
function getMoviesSavedCardArr() {
  const moviesCard = {
    image:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    nameRU: '33 слова о дизайне',
    duration: '1ч42м',
  };

  const arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(moviesCard);
  }
  return new Promise(function (res) {
    setTimeout(res(arr), 50000);
  });
}

function SavedMovies() {
  const [isLoading, setIsLoading] = useState(true);
  const [saveMoviesCardArr, setSaveMoviesCardArr] = useState([]);

  useEffect(() => {
    getMoviesSavedCardArr()
      .then((data) => setSaveMoviesCardArr(data))
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.log('Ошибка получения данных' + err);
      });
  }, []);

  return (
    <main>
      <MoviesPage isLoading={isLoading} moviesCardArr={saveMoviesCardArr} />
    </main>
  );
}

export default SavedMovies;
