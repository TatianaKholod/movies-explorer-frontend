import { createRef, useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  moviesCardArr,
  isLoading,
  handleOnClickLike,
  messageStr,
  arrForLikeCard
}) {
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

  //  Для хранения реально отображенных карточек
  const [countDisplayedCards, setCountDisplayedCards] = useState(0);

  useEffect(() => {
    setCountDisplayedCards(getCountDisplayedCards(refGrid.current));
  }, [refGrid]);

  // Для определения кол-ва колонок и высоты элементов грида
  const determinePropertiesGrid = () => {
    // получаем все стили элемента
    const stylesGrid = window.getComputedStyle(refGrid.current);
    const columns = stylesGrid.getPropertyValue('grid-template-columns');
    const rows = stylesGrid.getPropertyValue('grid-template-rows');
    const gap = stylesGrid.getPropertyValue('row-gap');
    // уберем px из полученных значений свойств
    const heightCard =
      +rows.slice(0, rows.indexOf('px')) + +gap.slice(0, gap.indexOf('px'));
    return { countColumns: (columns.match(/px/g) || []).length, heightCard };
  };

  // Для определения высоты контейнера
  const determineHeightConteiner = (countColumns, heightCard, countCards) => {
    // 70 это padding По хорошему нужно брать из свойств TODO
    return +Math.ceil(countCards / countColumns) * heightCard + +70 + 'px';
  };

  const updateHeightContainer = () => {
    const { countColumns, heightCard } = determinePropertiesGrid();
    setTimeout(
      refGrid.current.parentElement.style.setProperty(
        'max-height',
        determineHeightConteiner(countColumns, heightCard, countDisplayedCards)
      ),
      500
    );
  };

  // Для изменения размеров контейнера при resize
  useEffect(() => {
    window.addEventListener('resize', updateHeightContainer);
    return () => window.removeEventListener('resize', updateHeightContainer);
  });

  // Обработчик нажатия кнопки Еще
  const handleOnClikMore = () => {
    const { countColumns, heightCard } = determinePropertiesGrid();
    const newCountCards =
      +(countColumns > 1 ? countColumns : 2) + countDisplayedCards;
    // приращение в гриде в одну колонку = 2
    refGrid.current.parentElement.style.setProperty(
      'max-height',
      determineHeightConteiner(countColumns, heightCard, newCountCards)
    );
    setCountDisplayedCards(newCountCards);
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
                {moviesCardArr.map((card, key) => (
                  <MoviesCard
                    key={key}
                    card={card}
                    handleOnClickLike={handleOnClickLike}
                    arrForLikeCard={arrForLikeCard}
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
