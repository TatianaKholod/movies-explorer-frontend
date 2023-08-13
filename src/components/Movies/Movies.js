import { useState, useEffect } from 'react';
import MoviesPage from '../MoviesPage/MoviesPage';

// временно для тестирования верстки
function getMoviesCardArr() {
  const moviesCard = {
    image:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    nameRU: '33 слова о дизайне',
    duration: '1ч42м',
  };

  const arr = [];
  for (let i = 0; i < 20; i++) {
    arr.push(moviesCard);
  }

  return new Promise(function (res) {
    setTimeout(res(arr), 500);
  });
}

function Movies() {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesCardArr, setMoviesCardArr] = useState([]);

  useEffect(() => {
    getMoviesCardArr()
      .then((data) => setMoviesCardArr(data))
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.log('Ошибка получения данных' + err);
      });
  }, []);

  return (
    <div>
      <MoviesPage isLoading={isLoading} moviesCardArr={moviesCardArr} />
    </div>
  );
}

export default Movies;
