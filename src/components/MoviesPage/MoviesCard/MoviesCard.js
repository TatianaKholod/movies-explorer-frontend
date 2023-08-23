import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './MoviesCard.css';

function MoviesCard({ card, handleOnClickLike, arrForLikeCard }) {
  const location = useLocation();
  const imgUrl = card.image.url
    ? `https://api.nomoreparties.co${card.image.url}`
    : card.image;
  const hours = Math.trunc(card.duration / 60);
  const duration = `${hours > 0 ? hours + 'ч' : ''}${card.duration % 60}м`;

  const [stateLikeCard, setStateLikeCard] = useState(false);

  useEffect(() => {
    setStateLikeCard(arrForLikeCard.some((item) => item.movieId === card.id));
  }, [arrForLikeCard, card]);

  const handleOnClickCard = (e) => {
    if (e.target.type === 'button') return;
    window.open(card.trailerLink);
  };

  const handleOnClickLikeCard = (e) => {
    // пока меняем состояние кнопка не должна нажиматься повторно
    e.target.disabled = true;
    !stateLikeCard
      ? handleOnClickLike({ ...card, image: imgUrl }).then(() => {
          e.target.disabled = false;
        })
      : handleOnClickLike(
          arrForLikeCard.find((item) => item.movieId === card.id)._id
        ).then(() => {
          e.target.disabled = false;
        });
  };
  const handleOnClickDelCard = (e) => {
    e.target.disabled = true;
    handleOnClickLike(card._id).then(() => {
      e.target.disabled = false;
    });
  };
  return (
    <li className='movies-card' onClick={handleOnClickCard}>
      <img className='movies-card__image' src={imgUrl} alt={card.nameRU} />
      <div className='movies-card__name'>
        <div className='movies-card__text'>
          <h2 className='movies-card__text-name'>{card.nameRU}</h2>
          <p className='movies-card__duration'>{duration}</p>
        </div>
        {location.pathname !== '/movies' ? (
          <button
            className='movies-card__remove-btn link'
            type='button'
            name='remove-card'
            aria-label='Удалить'
            onClick={handleOnClickDelCard}
          >
            +
          </button>
        ) : (
          <button
            name='like-toggle'
            className={`movies-card__like-toggle link ${
              stateLikeCard ? 'movies-card__like-toggle_on' : ''
            }`}
            aria-label='Нравится'
            type='button'
            onClick={handleOnClickLikeCard}
          ></button>
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
