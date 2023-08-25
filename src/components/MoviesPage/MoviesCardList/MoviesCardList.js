import { createRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const L_ROW_CARD_COUNT = 4;
const S_ROW_CARD_COUNT = 5;
const ACC_L_ROW_CARD_COUNT = 1;
const ACC_S_ROW_CARD_COUNT = 2;

function MoviesCardList({
  moviesCardArr,
  isLoading,
  handleOnClickLike,
  messageStr,
  arrForLikeCards,
}) {
  const refGrid = createRef();
  const location = useLocation();
  //  Для хранения реально отображенных карточек
  const [countDisplayedCards, setCountDisplayedCards] = useState(0);
  // для хранения текущего количества приращений
  const [accRows, setAccRows] = useState(0);

  const getCountColumnsGrid = () => {
    const stylesGrid = window.getComputedStyle(refGrid.current);
    return (
      stylesGrid.getPropertyValue('grid-template-columns').match(/px/g) || []
    ).length;
  };

  // подсчет карточек для отображения
  const getCountDisplayedCards = (gridElem) => {
    if (location.pathname === '/saved-movies') return moviesCardArr.length;
    if (!gridElem) return 0;
    const countColumnsGrid = getCountColumnsGrid();
    return countColumnsGrid > 1
      ? L_ROW_CARD_COUNT * countColumnsGrid +
          accRows * countColumnsGrid * ACC_L_ROW_CARD_COUNT
      : S_ROW_CARD_COUNT + accRows * ACC_S_ROW_CARD_COUNT;
  };

  useEffect(() => {
    setCountDisplayedCards(getCountDisplayedCards(refGrid.current));
  }, [refGrid]);

  useEffect(() => {
    setAccRows(0);
  }, [moviesCardArr]);

  const handleOnClikMore = () => {
    setAccRows(accRows + 1);
  };

  return (
    <section className='card-list movies-main-section' aria-label='Галерея'>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <div className='card-list__container'>
            {messageStr ? (
              <p className='card-list__message'>{messageStr}</p>
            ) : (
              <ul
                className='card-list__list movies-common-section'
                ref={refGrid}
              >
                {moviesCardArr.slice(0, countDisplayedCards).map((card) => (
                  <MoviesCard
                    key={card.id ? card.id : card._id}
                    card={card}
                    handleOnClickLike={handleOnClickLike}
                    arrForLikeCards={arrForLikeCards}
                  />
                ))}
              </ul>
            )}
          </div>
          <div className='card-list__button-container'>
            <button
              className={`card-list__button link ${
                countDisplayedCards < moviesCardArr.length &&
                countDisplayedCards !== 0
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
