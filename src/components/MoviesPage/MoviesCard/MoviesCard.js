import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ card }) {
  const location = useLocation();
  return (
    <li className='movies-card'>
      <img className='movies-card__image' src={card.image} alt={card.nameRU} />
      <div className='movies-card__name'>
        <div className='movies-card__text'>
          <h2 className='movies-card__text-name'>{card.nameRU}</h2>
          <p className='movies-card__duration'>{card.duration}</p>
        </div>
        {location.pathname !== '/movies' ? (
          <button
            className='movies-card__remove-btn link'
            type='button'
            name='remove-card'
            aria-label='Удалить'
          >
            +
          </button>
        ) : (
          <button
            name='like-toggle'
            //TODO замени true на признак карточки сохраненной
            className={`movies-card__like-toggle link ${
              true ? 'movies-card__like-toggle_on' : ''
            }`}
            aria-label='Нравится'
            type='button'
          ></button>
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
