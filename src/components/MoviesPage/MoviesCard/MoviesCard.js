import { useLocation } from 'react-router-dom';
import './MoviesCard.css';


function MoviesCard({ card, handleOnClickLike }) {
  const location = useLocation();
  const imgUrl = (card.image.url) ? `https://api.nomoreparties.co${card.image.url}` : card.image;
  const hours = Math.trunc(card.duration / 60);
  const duration = `${hours > 0 ? hours + 'ч' : ''}${card.duration % 60}м`;

  const handleOnClickCard = (e) => {
    if (e.target.type === 'button') return;
    window.open(card.trailerLink);
  };

  const handleOnClickLikeCard = () =>{
    handleOnClickLike({...card,'image':imgUrl});
  }
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
          >
            +
          </button>
        ) : (
          <button
            name='like-toggle'
            //TODO замени false на признак карточки сохраненной
            className={`movies-card__like-toggle link ${
              card.like ? 'movies-card__like-toggle_on' : ''
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
