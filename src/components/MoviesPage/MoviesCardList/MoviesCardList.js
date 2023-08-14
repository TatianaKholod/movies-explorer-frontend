import { createRef, useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ moviesCardArr, isLoading }) {
  const refGrid = createRef();

  // подсчет реально отображенных в контейнере карточек без скрытых
  const getCountDisplayedCards = (gridElem) => {
    if (!gridElem) return 0;

    const maxTop =
      gridElem.parentElement.offsetTop + gridElem.parentElement.offsetHeight;
    return Array.from(gridElem.children).reduce(
      (s, i) => (i.offsetTop < maxTop ? (s = s + 1) : s),
      0
    );
  };

  const [countDisplayedCards, setCountDisplayedCards] = useState(0);
  //const [currentCards, setCurrentCards] = useState([]);
  
  //let lastDisplayedCardIndex = 0; //TODO

  useEffect(() => {
    setCountDisplayedCards(getCountDisplayedCards(refGrid.current));
  }, [refGrid]);

  const handleOnClikMore = () => {
  /*  lastDisplayedCardIndex = lastDisplayedCardIndex + countDisplayedCards;
    lastDisplayedCardIndex = (lastDisplayedCardIndex >= moviesCardArr.length)? 0 : lastDisplayedCardIndex;
     setCurrentCards(moviesCardArr.slice(lastDisplayedCardIndex, lastDisplayedCardIndex+16)); */
  };

  return (
    <section className='card-list movies-main-section' aria-label='Галерея'>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <div className='card-list__container'>
            <ul className='card-list__list movies-common-section' ref={refGrid}>
              {moviesCardArr.map((card, key) => (
                <MoviesCard key={key} card={card} />
              ))}
            </ul>
          </div>
          <div className='card-list__button-container'>
            <button
              className={`card-list__button link ${
                countDisplayedCards < moviesCardArr.length
                  ? 'card-list__button_on'
                  : ''
              }`}
              type='button'
              onClick={handleOnClikMore}
            >
              Ещё
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
