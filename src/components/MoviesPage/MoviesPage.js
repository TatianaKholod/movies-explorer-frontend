import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import './MoviesPage.css';

function MoviesPage({
  moviesCardArr,
  isLoading,
  handleOnClickLike,
  handleClicSearchBtn,
  messageStr,
  handleClicCheckDuration,
  arrForLikeCards,
}) {
  return (
    <>
      <SearchForm
        handleClicSearchBtn={handleClicSearchBtn}
        handleClicCheckDuration={handleClicCheckDuration}
      />
      <MoviesCardList
        isLoading={isLoading}
        moviesCardArr={moviesCardArr || []}
        handleOnClickLike={handleOnClickLike}
        messageStr={messageStr}
        arrForLikeCards={arrForLikeCards}
      />
    </>
  );
}

export default MoviesPage;
